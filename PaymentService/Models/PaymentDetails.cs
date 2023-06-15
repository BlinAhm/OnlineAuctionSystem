using Stripe;
using System;

namespace PaymentService.Models
{
    public class PaymentDetails
    {
        public string UserId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public AnyOf<string, CardCreateNestedOptions> Token { get; internal set; }
    }
}
