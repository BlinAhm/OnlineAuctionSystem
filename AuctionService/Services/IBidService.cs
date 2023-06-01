namespace AuctionService.Services
{
    public interface IBidService
    {
        public Task<bool> AddBid();
        public Task<bool> DeleteBid();
        public Task<bool> UpdateBid();
    }
}
