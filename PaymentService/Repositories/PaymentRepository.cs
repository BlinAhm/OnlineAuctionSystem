using PaymentService.Models;
using System.Threading.Tasks;

namespace PaymentService.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly YourDatabaseContext _dbContext;

        public PaymentRepository(YourDatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task UpdatePaymentStatusAsync(string paymentId, PaymentStatus status)
        {
            // Retrieve the payment from the database
            var payment = await _dbContext.Payments.FindAsync(paymentId);

            if (payment != null)
            {
                // Update the payment status
                payment.Status = status;

                // Save the changes to the database
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
