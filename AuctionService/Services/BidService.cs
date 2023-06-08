using AuctionService.Data;
using AuctionService.Models;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.EntityFrameworkCore;

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
                Auction = auction
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

    }
}
