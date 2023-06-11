using PaymentService.Services;
using UserService.Services;
using ItemService.Services;

namespace PaymentService.Models
{
    

    public class PaymentService
    {
        private readonly IPaymentGateway _paymentGateway;
        private readonly IAuthenticateService _authenticateService;
        private readonly IItemService _itemService;

        public PaymentService(IPaymentGateway paymentGateway, IAuthenticateService authenticateService, IItemService itemService)
        {
            _paymentGateway = paymentGateway;
            _authenticateService = authenticateService;
            _itemService = itemService;
        }

        public async Task<PaymentResult> ProcessPaymentAsync(PaymentRequest request)
        {
            // Retrieve user information from the User service
            var user = await _authenticateService.GetUserAsync(request.UserId);

            // Retrieve payment details or any other necessary information from the User service
            var paymentDetails = await _authenticateService.GetPaymentDetailsAsync(request.UserId);

            // Call the payment gateway (e.g., PayPal) to process the payment
            var paymentResult = await _paymentGateway.ProcessPaymentAsync(request.Amount, paymentDetails);

            // Call the payment gateway (e.g., PayPal) to process the payment
            var paymentResult = await _paymentGateway.ProcessPaymentAsync(request.Amount, paymentDetails);

            // Update the payment status in the Payment service's database or storage
            var paymentStatus = paymentResult.Success ? PaymentStatus.Completed : PaymentStatus.Failed;
            await _paymentRepository.UpdatePaymentStatusAsync(request.PaymentId, paymentStatus);

            // Communicate the payment status back to the Item service
            await _itemService.UpdatePaymentStatusAsync(request.ItemId, paymentStatus);

            // Update the payment status in the Payment service's database or storage

            return paymentResult;
        }
    }

}
