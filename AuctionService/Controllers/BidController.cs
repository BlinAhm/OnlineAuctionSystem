using AuctionService.Data;
using AuctionService.Models;
using AuctionService.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace AuctionService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidController : Controller
    {
        private readonly IBidService _bidService;
        private readonly AuctionDbContext _context;

        public BidController(
            IBidService bidService,
            AuctionDbContext context
            )
        {
            _bidService = bidService;
            _context = context;
        }

        // Get all Bids
        [HttpGet]
        public ActionResult<IEnumerable<Bid>> GetBids()
        {
            return _context.Bids.Select(
                b => new Bid
                {
                    Id = b.Id,
                    UserId = b.UserId,
                    BidAmount = b.BidAmount,
                    BidDate = b.BidDate,
                    Auction = b.Auction
                }).ToList();
        }

        // Get Bid by id
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Bid>> GetBidById(int id)
        {
            var bid = await _context.Bids.FindAsync(id);
            if (bid == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response { Status = "Error", Message = "Bid not found." });
            }

            return _context.Bids.Select(
                b => new Bid
                {
                    Id = b.Id,
                    UserId = b.UserId,
                    BidAmount = b.BidAmount,
                    BidDate = b.BidDate,
                    Auction = new Auction
                    {
                        Id = b.Auction.Id,
                        Title = b.Auction.Title,
                        ItemId = b.Auction.ItemId,
                        Description = b.Auction.Description,
                        StartTime = b.Auction.StartTime,
                        EndTime = b.Auction.EndTime,
                        CurrentBid = b.Auction.CurrentBid
                    }
                }).Where(x => x.Id == id).First();
        }
        // Get latest Bids
        [HttpGet]
        [Route("{id}/latest")]
        public ActionResult<List<Bid>> GetLatestBids(int id)
        {
            var auction = _context.Auctions.Include("Bids").Where(x=>x.Id == id).First();
            if (auction == null) { return StatusCode(StatusCodes.Status404NotFound, new Response { Status = "Error", Message = "Auction not found." }); }

            return auction.Bids.OrderByDescending(x => x.Id).Take(3).Select(
                b => new Bid
                {
                    Id = b.Id,
                    UserId = b.UserId,
                    BidAmount = b.BidAmount,
                    BidDate = b.BidDate,
                    Auction = null
                }).ToList();
        }

        // Add Bid
        [HttpPost]
        public async Task<IActionResult> AddBid(BidViewModel bidModel)
        {
            if (bidModel == null)
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Bid model invalid." });

            if (await _bidService.AddBid(bidModel))
                return Ok(new Response { Status = "Success", Message = "Bid added successfully." });
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Bid creation failed." });
        }

        // Update Bid
        [HttpPut]
        public async Task<IActionResult> UpdateBid(Bid updateModel)
        {
            if (updateModel == null)
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Update model invalid." });

            if (await _bidService.UpdateBid(updateModel))
                return Ok(new Response { Status = "Success", Message = "Bid updated successfully!" });
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Failed to update bid!" });
        }

        // Delete Bid
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteBid(int id)
        {
            if (await _bidService.DeleteBid(id))
                return Ok(new Response { Status = "Success", Message = "Bid deleted successfully!" });
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Failed to delete bid!" });
        }
    }
}
