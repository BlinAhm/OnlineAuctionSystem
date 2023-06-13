using AuctionService.Data;
using AuctionService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("AuctionServiceContextConnection") ?? throw new InvalidOperationException("Connection string 'AuctionServiceContextConnection' not found.");

builder.Services.AddDbContext<AuctionDbContext>(options =>
    options.UseSqlServer(connectionString));

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("default", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:8040").AllowAnyMethod().AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddScoped<IAuctionService, AuctionService.Services.AuctionService>();
builder.Services.AddScoped<IBidService, AuctionService.Services.BidService>();

builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();
app.UseCors("default");
app.MapControllers();

app.Run();
