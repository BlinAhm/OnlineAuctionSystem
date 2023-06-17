using AuctionService.Models;

namespace AuctionService.Services
{
    public interface IAuctionService
    {
        public Task<bool> AddAuction(AuctionViewModel auctionModel);
        public Task<bool> UpdateAuction(Auction updateModel);
        public Task<bool> DeleteAuction(int id);
        public Task<TimeSpan> GetRemainingTime(int id);
        public Task<bool> EndAuction();

    }
}
