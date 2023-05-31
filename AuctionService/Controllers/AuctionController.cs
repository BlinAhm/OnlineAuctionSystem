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
            return _context.Auctions.ToList();
        }

        // Get auction by Id
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Auction>> GetAuction(string id)
        {
            var auction = await _context.Auctions.FindAsync(id);
            if (auction == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response { Status = "Error", Message = "Auction not found." });
            }

            return auction;
        }

        // Add Auction -
        [HttpPost]
        public async Task<IActionResult> AddAuction(Auction auctionModel)
        {
            if (auctionModel == null)
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Auction model invalid." });

            if (await _auctionService.AddAuction(auctionModel))
                return Ok(new Response { Status = "Success", Message = "Auction added successfully." });

            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Auction creation failed." });
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAuction(Auction updateModel)
        {
            if (updateModel == null)
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Update model invalid." });

            var response = await _auctionService.UpdateAuction(updateModel);

            if(response)
                return Ok(new Response { Status = "Success", Message = "Auction updated successfully!" });
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Failed to update auction!" });
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteAuction(int id)
        {
            var response = await _auctionService.DeleteAuction(id);

            if(response)
                return Ok(new Response { Status = "Success", Message = "Auction deleted successfully!" });
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Failed to delete auction!" });
        }
    }
}
