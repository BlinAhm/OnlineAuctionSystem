using PaymentService.Services;
using UserService.Services;
using ItemService.Services;
using PaymentService.Repositories;

namespace PaymentService.Models
{

        public enum PaymentStatus
        {
            Completed,
            Failed
        }

 


    public class PaymentService
    {
        private readonly IPaymentGateway _paymentGateway;
        private readonly IAuthenticateService _authenticateService;
        private readonly IItemService _itemService;
        private readonly IPaymentRepository _paymentRepository;

        public PaymentService(IPaymentGateway paymentGateway, IAuthenticateService authenticateService, IItemService itemService, IPaymentRepository paymentRepository)
        {
            _paymentGateway = paymentGateway;
            _authenticateService = authenticateService;
            _itemService = itemService;
            _paymentRepository = paymentRepository;
        }

        public async Task<PaymentResult> ProcessPaymentAsync(PaymentRequest request)
        {
            var user = await _authenticateService.GetUserAsync(request.UserId);

            // Create an instance of PaymentDetails and populate it with the user's payment details
            var paymentDetails = new PaymentDetails
            {
                UserId = request.UserId,
                // Set other payment details properties based on your requirements
            };

            // Call the payment gateway (Stripe) to process the payment
            var paymentResult = await _paymentGateway.ProcessPaymentAsync(request.Amount, paymentDetails);

            var paymentStatus = paymentResult.Success ? PaymentStatus.Completed : PaymentStatus.Failed;
            await _paymentRepository.UpdatePaymentStatusAsync(request.PaymentId.ToString(), paymentStatus);

            await _itemService.UpdatePaymentStatusAsync(request.ItemId, paymentStatus);

            return paymentResult;
        }
    }
}
