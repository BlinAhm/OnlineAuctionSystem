using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PaymentService.Services;


    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddScoped<IPaymentGateway, StripePaymentGateway>();

            builder.Services.AddControllers();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Retrieve the Stripe API keys from appsettings.json
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            string stripePublicKey = configuration["pk_test_51NIzDSCcc0zc4OuuoHdDdIEKiDLTox14xq0t3ibJSej0i3x8kBEDdgaoyaZmJhJO9XiYBifjYP8O3LidtjyleUUv00boRec9gm"];
            string stripeSecretKey = configuration["sk_test_51NIzDSCcc0zc4OuuglVVxemG4QGMT71s4DBirGvXBMTvjGVUvSBCK1FwC7edpjOlz9YY1m2NCUJKN8UblBjCAf0v00gfrFUcY4"];

            // Add services to the container.
            services.AddScoped<IPaymentGateway>(provider => new StripePaymentGateway(stripeSecretKey));

            services.AddControllers();
        }
    }

