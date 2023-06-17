using AuctionService.Models;
namespace AuctionService.Services
{
    public interface INotificationService
    {
        public Task<bool> AddNotification(NotificationViewModel notificationModel);
        public Task<bool> RemoveNotification(int id);
        public Task<bool> UpdateNotification(Notification updateModel);
    }
}
