namespace AuctionService.Models
{
    public class BidViewModel
    {
        public string UserId { get; set; }
        public float BidAmount { get; set; }
        public DateTime? BidDate { get; set; }
        public int AuctionId { get; set; }
    }
}
