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

        public async Task<bool> AddAuction(AuctionViewModel auctionModel)
        {
            DateTime utcTime = DateTime.UtcNow;
            var tz = TimeZoneInfo.FindSystemTimeZoneById("Central Europe Standard Time");
            var time = TimeZoneInfo.ConvertTimeFromUtc(utcTime, tz);

            Auction auction = new Auction()
            {
                Title = auctionModel.Title,
                StartTime = DateTime.Parse(time.ToString("yyyy-MM-dd HH:mm:ss")),
                EndTime = DateTime.Parse(time.AddHours(auctionModel.Duration).ToString("yyyy-MM-dd HH:mm:ss")),
                ItemId = auctionModel.ItemId,
                UserId = auctionModel.UserId
            };

            await _context.Auctions.AddAsync(auction);
            await _context.SaveChangesAsync();

            return _context.Auctions.Where(x => x.Id == auction.Id).Any();
        }

        public async Task<bool> UpdateAuction(Auction updateModel)
        {
            Auction? auction = await _context.Auctions.FindAsync(updateModel.Id);
            if (auction == null)
                return false;

            auction.Title = updateModel.Title;
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

        public async Task<TimeSpan> GetRemainingTime(int id)
        {
            DateTime utcTime = DateTime.UtcNow;
            var tz = TimeZoneInfo.FindSystemTimeZoneById("Central Europe Standard Time");
            var time = TimeZoneInfo.ConvertTimeFromUtc(utcTime, tz);

            var auction = await _context.Auctions.FindAsync(id);
            if (auction == null) return TimeSpan.Zero;

            var startTime = auction.StartTime;
            var endTime = auction.EndTime;

            var remainingTime = endTime.Subtract(time);
            return remainingTime;
        }

        public Task<bool> EndAuction()
        {
            throw new NotImplementedException();
        }
    }
}
