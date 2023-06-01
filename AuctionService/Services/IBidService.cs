using AuctionService.Models;

namespace AuctionService.Services
{
    public interface IBidService
    {
        public Task<bool> AddBid(Bid bidModel);
        public Task<bool> UpdateBid(Bid updateModel);
        public Task<bool> DeleteBid(int id);
    }
}
