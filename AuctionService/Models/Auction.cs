namespace AuctionService.Models
{
    public class Auction
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ItemId { get; set; }
        public string Description { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public Bid? CurrentBid { get; set; }
        public virtual List<Bid> Bids { get; set; }

        public Auction()
        {
            Bids= new List<Bid>();
        }
    }
}
