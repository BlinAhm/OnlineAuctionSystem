using AuctionService.Data;
using AuctionService.Models;
using AuctionService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserService.Auth;
using Response = AuctionService.Models.Response;

namespace AuctionService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : Controller
    {
        private readonly IAuctionService _auctionService;
        private readonly AuctionDbContext _context;

        public AuctionController(
            IAuctionService auctionService,
            AuctionDbContext context
            )
        {
            _auctionService = auctionService;
            _context = context;
        }

        // Get all auctions
        [HttpGet]
        public ActionResult<IEnumerable<Auction>> GetAuctions()
        {
            return _context.Auctions.Include("Bids").ToList();
        }

        // Get won auctions
        [HttpGet]
        [Route("won/{userId}")]
        public ActionResult<IEnumerable<Auction>> GetWonAuctions(string userId)
        {
            return _context.Auctions.Include(x => x.CurrentBid).Where(x => x.HasEnded).Where(x => x.UserId == userId).ToList();
        }

        // Get all auctions by item ids
        [HttpPost]
        [Route("item")]
        public ActionResult<IEnumerable<Auction>> GetAuctionsByItemIds([FromBody] string items)
        {
            var itemIds = items.Split(',');
            List<Auction> auctions = new List<Auction>();
            var allAuctions = _context.Auctions.Include(x => x.CurrentBid).ToList();
            foreach (string itemId in itemIds)
            {
                foreach (var auction in allAuctions)
                {
                    if (auction.ItemId == itemId)
                    {
                        auctions.Add(auction);
                    }
                }
            }
            return auctions;
        }

        // Get auctions by userId
        [HttpGet]
        [Authorize(Roles = UserRoles.User)]
        [Route("user/{userId}")]
        public ActionResult<IEnumerable<Auction>> GetAuctionsByUser(string userId)
        {
            return _context.Auctions.Include(x => x.CurrentBid).Where(x => x.UserId == userId).ToList();
        }

        // Get auction by Id
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Auction>> GetAuctionById(int id)
        {
            var auction = await _context.Auctions.FindAsync(id);
            if (auction == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response { Status = "Error", Message = "Auction not found." });
            }

            return _context.Auctions.Include(x => x.Bids).Include(x => x.CurrentBid).Where(x => x.Id == id).First();
        }

        // Add Auction
        [HttpPost]
        [Authorize(Roles = UserRoles.User)]
        public async Task<IActionResult> AddAuction(AuctionViewModel auctionModel)
        {
            if (auctionModel == null)
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Auction model invalid." });

            if (await _auctionService.AddAuction(auctionModel))
                return Ok(new Response { Status = "Success", Message = "Auction added successfully." });

            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Auction creation failed." });
        }

        // Update Auction
        [HttpPut]
        [Authorize(Roles = UserRoles.User)]
        public async Task<IActionResult> UpdateAuction(Auction updateModel)
        {
            if (updateModel == null)
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Update model invalid." });

            if (await _auctionService.UpdateAuction(updateModel))
                return Ok(new Response { Status = "Success", Message = "Auction updated successfully!" });
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Failed to update auction!" });
        }

        // Get remaining time
        [HttpGet]
        [Route("{id}/time")]
        public async Task<ActionResult<TimeSpan>> GetRemainingTime(int id)
        {
            var time = await _auctionService.GetRemainingTime(id);

            if (time == TimeSpan.Zero)
                return StatusCode(StatusCodes.Status500InternalServerError);

            return Ok(time);
        }

        // Delete Auction
        [HttpDelete]
        [Authorize(Roles = UserRoles.User)]
        [Route("{id}")]
        public async Task<IActionResult> DeleteAuction(int id)
        {
            if (await _auctionService.DeleteAuction(id))
                return Ok(new Response { Status = "Success", Message = "Auction deleted successfully!" });
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Failed to delete auction!" });
        }
    }
}
