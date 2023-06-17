namespace PaymentService.Services
{
    public interface IPaymentGateway
    {
        Task<PaymentResult> ProcessPaymentAsync(decimal amount, PaymentDetails paymentDetails);
    }
}