namespace AuctionService.Models
{
    public class Auction
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string UserId { get; set; }
        public string ItemId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public Bid? CurrentBid { get; set; }
        public bool HasEnded
        {
            get
            {
                DateTime utcTime = DateTime.UtcNow;
                var tz = TimeZoneInfo.FindSystemTimeZoneById("Central Europe Standard Time");
                var time = TimeZoneInfo.ConvertTimeFromUtc(utcTime, tz);
                return time >= EndTime;
            }
        }
        public virtual List<Bid> Bids { get; set; }

        public Auction()
        {
            Bids= new List<Bid>();
        }
    }
}
