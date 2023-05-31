using AuctionService.Data;
using AuctionService.Models;
using AuctionService.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : Controller
    {
        private readonly IAuctionService _auctionService;
        private readonly AuctionDbContext _context;

        public AuctionController(IAuctionService auctionService)
        {
            _auctionService = auctionService;
        }

        // Get all auctions
        [HttpGet]
        public ActionResult<IEnumerable<Auction>> GetAuctions()
        {
            return _context.Auctions.ToList();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Auction>> GetAuction(string id)
        {
            var auction = await _context.Auctions.FindAsync(id);
            if(auction == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response { Status = "Error", Message = "Auction not found." });
            }

            return auction;
        }
    }
}
