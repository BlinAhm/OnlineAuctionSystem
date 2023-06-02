using AuctionService.Models;

namespace AuctionService.Services
{
    public interface IBidService
    {
        public Task<bool> AddBid(BidViewModel bidModel);
        public Task<bool> UpdateBid(Bid updateModel);
        public Task<bool> DeleteBid(int id);
    }
}
