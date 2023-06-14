using AuctionService.Data;
using AuctionService.Models;

namespace AuctionService.Services
{
    public class NotificationService : INotificationService
    {
        private readonly AuctionDbContext _context;

        public NotificationService(AuctionDbContext context)
        {
            _context = context;
        }
        public Task<bool> AddNotification(Notification notificationmodel)
        {
            throw new NotImplementedException();
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

        public async Task<bool> UpdateNotification(Notification updatemodel)
        {
            Notification? notification = await _context.Notifications.FindAsync(updatemodel.Id);
            if (notification == null)
                return false;

            notification.Id = updatemodel.Id;
            notification.UserId = updatemodel.UserId;
            notification.Message = updatemodel.Message;
            notification.Date = updatemodel.Date;

             await _context.SaveChangesAsync();

            if (notification == await _context.Notifications.FindAsync(updatemodel.Id))
                return true;
            return false;
        }
    }
}