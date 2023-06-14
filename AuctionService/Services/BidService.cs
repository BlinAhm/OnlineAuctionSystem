using AuctionService.Data;
using AuctionService.Models;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AuctionService.Services
{
    public class BidService : IBidService
    {
        private readonly AuctionDbContext _context;

        public BidService(AuctionDbContext context)
        {
            _context = context;
        }
        public async Task<bool> AddBid(BidViewModel bidModel)
        {
            var auction = _context.Auctions.Include(x => x.CurrentBid).Where(x => x.Id == bidModel.AuctionId).First();
            if (auction == null) { return false; }

            //Check if bid amount is less or equal to current bid
            if (auction.CurrentBid != null)
            {
                if (auction.CurrentBid.BidAmount >= bidModel.BidAmount)
                    return false;
            }

            Bid bid = new Bid()
            {
                UserId = bidModel.UserId,
                BidAmount = bidModel.BidAmount,
                BidDate = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss")),
                Auction = auction,
                IsWithdrawn = false,
                WithdrawDate = null
            };
            await _context.Bids.AddAsync(bid);
            //Update current bid for auction
            auction.CurrentBid = bid;

            await _context.SaveChangesAsync();

            return _context.Bids.Where(x => x.Id == bid.Id).Any();
        }

        public async Task<bool> UpdateBid(Bid updateModel)
        {
            Bid? bid = await _context.Bids.FindAsync(updateModel.Id);
            if (bid == null)
                return false;

            bid.UserId = updateModel.UserId;
            bid.BidAmount = updateModel.BidAmount;
            bid.BidDate = updateModel.BidDate;
            bid.IsWithdrawn = updateModel.IsWithdrawn;
            bid.WithdrawDate = updateModel.WithdrawDate;
            bid.Auction = updateModel.Auction;

            await _context.SaveChangesAsync();

            if (bid == await _context.Bids.FindAsync(updateModel.Id))
                return true;
            return false;
        }

        public async Task<bool> DeleteBid(int id)
        {
            var bid = await _context.Bids.FindAsync(id);
            if (bid == null)
                return false;

            _context.Bids.Remove(bid);
            await _context.SaveChangesAsync();

            if (await _context.Bids.FindAsync(id) == null)
                return true;
            return false;
        }

        public async Task<bool> WithdrawBid(int id)
        {
            var bid = _context.Bids.Include(x => x.Auction).Where(x => x.Id == id).First();
            if (bid == null)
                return false;

            bid.IsWithdrawn = true;
            bid.WithdrawDate = DateTime.Now;
            await _context.SaveChangesAsync();

            Auction? auction = _context.Auctions.Include(x => x.CurrentBid).Include(x => x.Bids).Where(x => x.Id == bid.Auction.Id).First();
            if (auction == null) { return false; }

            if (auction.CurrentBid == bid)
            {
                var cb = auction.Bids.OrderByDescending(x => x.Id).Take(10).Where(x => x.IsWithdrawn == false).FirstOrDefault();
                auction.CurrentBid = cb;
            }

            await _context.SaveChangesAsync();
            if (auction.CurrentBid == null)
                return true;

            if (auction.CurrentBid != bid && bid.IsWithdrawn == true && auction.CurrentBid.IsWithdrawn == false)
                return true;
            return false;
        }

    }
}
