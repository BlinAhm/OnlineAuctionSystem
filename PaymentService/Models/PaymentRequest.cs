namespace PaymentService.Models
{
    public class PaymentRequest
    {
        public string UserId { get; set; }
        public decimal Amount { get; set; }
        public int PaymentId { get; set; }
        public int ItemId { get; set; }
    }
}
