using AuctionService.Data;
using AuctionService.Models;
using AuctionService.Services;
using Microsoft.AspNetCore.Mvc;

namespace AuctionService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : Controller
    {
        private readonly INotificationService _notificationService;
        private readonly AuctionDbContext _context;

        public NotificationController(
            INotificationService notificationService,
            AuctionDbContext context
            )
        {
            _notificationService = notificationService;
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> AddNotification(NotificationViewModel notificationModel)
        {
            if (notificationModel == null)
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Notification model invalid." });

            if (await _notificationService.AddNotification(notificationModel))
                return Ok(new Response { Status = "Success", Message = "Notification added successfully." });
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Notification creation failed." });
        }
        [HttpPut]
        public async Task<IActionResult> UpdateNotification(Notification updateModel)
        {
            if (updateModel == null)
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Update model invalid." });

            if (await _notificationService.UpdateNotification(updateModel))
                return Ok(new Response { Status = "Success", Message = "Notification updated successfully!" });
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Failed to update notification!" });
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> RemoveNotification(int id)
        {
            if (await _notificationService.RemoveNotification(id))
                return Ok(new Response { Status = "Success", Message = "Notification deleted successfully!" });
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Failed to delete notification!" });
        }
    }
}
