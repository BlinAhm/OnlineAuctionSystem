using PaymentService.Models;
using System.Threading.Tasks;

namespace PaymentService.Repositories
{
    public interface IPaymentRepository
    {
        Task UpdatePaymentStatusAsync(string paymentId, PaymentStatus status);
    }
}
