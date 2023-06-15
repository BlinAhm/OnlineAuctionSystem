namespace PaymentService.Models
{
    public class PaymentResult
    {
        public bool Success { get; set; }
        public string ErrorMessage { get; set; }
        public string TransactionId { get; internal set; }
    }
}
