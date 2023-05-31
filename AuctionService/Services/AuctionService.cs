using AuctionService.Data;
using AuctionService.Models;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Services
{
    public class AuctionService : IAuctionService
    {
        private readonly AuctionDbContext _context;
        public AuctionService(AuctionDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddAuction(Auction auctionModel)
        {
            await _context.Auctions.AddAsync(auctionModel);
            await _context.SaveChangesAsync();

            return _context.Auctions.Where(x => x.Id == auctionModel.Id).Any();

        }

        public async Task<bool> UpdateAuction(Auction updateModel)
        {
            Auction? auction = await _context.Auctions.FindAsync(updateModel.Id);
            if (auction == null)
                return false;

            auction.Title = updateModel.Title;
            auction.Description = updateModel.Description;
            auction.ItemId = updateModel.ItemId;
            auction.CurrentBid = updateModel.CurrentBid;
            auction.StartTime = updateModel.StartTime;
            auction.EndTime = updateModel.EndTime;

            await _context.SaveChangesAsync();

            if (auction == await _context.Auctions.FindAsync(updateModel.Id))
                return true;
            return false;
        }

        public async Task<bool> DeleteAuction(int id)
        {
            var auction = await _context.Auctions.FindAsync(id);
            if (auction == null)
                return false;

            _context.Auctions.Remove(auction);
            await _context.SaveChangesAsync();

            if (await _context.Auctions.FindAsync(id) == null)
                return true;
            return false;
        }

        public Task<bool> EndAuction()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> StartAuction()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateBid()
        {
            throw new NotImplementedException();
        }
    }
}
