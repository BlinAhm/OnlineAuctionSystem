using ItemService.Models;
using System.Threading.Tasks;
using PaymentService.Models;

public interface IItemService
{
    Task<Item> GetItemByIdAsync(int itemId);
    Task UpdatePaymentStatusAsync(int itemId, PaymentStatus paymentStatus);
}
