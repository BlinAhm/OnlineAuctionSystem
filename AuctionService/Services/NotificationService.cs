using AuctionService.Data;
using AuctionService.Models;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Services
{
    public class NotificationService : INotificationService
    {
        private readonly AuctionDbContext _context;

        public NotificationService(AuctionDbContext context)
        {
            _context = context;
        }
       public async Task<bool> AddNotification(NotificationViewModel notificationModel)
        {
            Notification notification = new Notification()
            {
                UserId = notificationModel.UserId,
                Date = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")),
                Message= notificationModel.Message,
            };
            await _context.Notifications.AddAsync(notification);

            await _context.SaveChangesAsync();
            return _context.Notifications.Where(x => x.Id == notification.Id).Any();
        }

        public async Task<bool> RemoveNotification(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null)
                return false;
            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();

            if (await _context.Notifications.FindAsync(id) == null)
                return true;
            return false;

        }

        public async Task<bool> UpdateNotification(Notification updateModel)
        {
            Notification? notification = await _context.Notifications.FindAsync(updateModel.Id);
            if (notification == null)
                return false;

            notification.Id = updateModel.Id;
            notification.UserId = updateModel.UserId;
            notification.Message = updateModel.Message;
            notification.Date = updateModel.Date;

             await _context.SaveChangesAsync();

            if (notification == await _context.Notifications.FindAsync(updateModel.Id))
                return true;
            return false;
        }
    }
}