using ItemService.Controllers;
using ItemService.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using PaymentService.Models;

namespace ItemService.Services
{
    public class ItemService : IItemService
    {
        private readonly ItemController _itemController;

        public ItemService(ItemController itemController)
        {
            _itemController = itemController;
        }

        public async Task<Item> GetItemByIdAsync(int itemId)
        {
            var itemIdAsString = itemId.ToString();
            var itemActionResult = await _itemController.GetById(itemIdAsString);

            if (itemActionResult.Result is OkObjectResult okObjectResult)
            {
                return okObjectResult.Value as Item;
            }

            return null;
        }

        public async Task UpdatePaymentStatusAsync(int itemId, PaymentStatus paymentStatus)
        {
            var item = await GetItemByIdAsync(itemId);

            if (item != null)
            {
                // Update the item's payment status
                item.PaymentStatus = paymentStatus;

                // Call the appropriate method in the ItemController to update the item
                await _itemController.Update(item.ItemId, item);
            }
        }
    }
}
