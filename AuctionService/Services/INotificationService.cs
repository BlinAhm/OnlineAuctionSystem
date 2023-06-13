using AuctionService.Models;
namespace AuctionService.Services
{
    public interface INotificationService
    {
        public Task<bool> AddNotification(Notification notificationmodel);
        public Task<bool> RemoveNotification(int id);
        public Task<bool> UpdateNotification(Notification updatemodel);
    }
}
