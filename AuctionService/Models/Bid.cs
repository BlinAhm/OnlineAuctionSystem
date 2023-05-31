﻿namespace AuctionService.Models
{
    public class Bid
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public float BidAmount { get; set; }
        public DateTime BidDate { get; set; }
        public Auction? Auction { get; set; }    
    }
}
