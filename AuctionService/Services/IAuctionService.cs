namespace AuctionService.Services
{
    public interface IAuctionService
    {
        public Task<bool> AddAuction();
        public Task<bool> DeleteAuction();
        public Task<bool> UpdateAuction();
        public Task<bool> UpdateBid();
        public Task<bool> StartAuction();
        public Task<bool> EndAuction();

    }
}
