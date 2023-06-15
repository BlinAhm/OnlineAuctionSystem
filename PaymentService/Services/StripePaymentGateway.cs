using PaymentService.Models;
using PaymentService.Services;
using Stripe;

public class StripePaymentGateway : IPaymentGateway
{
    private readonly string _stripeSecretKey;

    public StripePaymentGateway(string stripeSecretKey)
    {
        _stripeSecretKey = stripeSecretKey;
    }

    public async Task<PaymentResult> ProcessPaymentAsync(decimal amount, PaymentDetails paymentDetails)
    {
        // Initialize Stripe with your API keys
        StripeConfiguration.ApiKey = _stripeSecretKey;

        // Create a charge with Stripe
        var options = new ChargeCreateOptions
        {
            Amount = (int)(amount * 100), // Convert to cents
            Currency = "usd",
            Description = "Payment for auction",
            Source = paymentDetails.Token // Payment token from the client-side
        };

        var service = new ChargeService();
        var charge = await service.CreateAsync(options);

        // Create a PaymentResult based on the charge result
        var paymentResult = new PaymentResult
        {
            Success = charge.Paid,
            TransactionId = charge.Id,
            ErrorMessage = charge.Paid ? null : "Payment failed"
        };

        return paymentResult;
    }
}
