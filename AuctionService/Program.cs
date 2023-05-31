using AuctionService.Data;
using AuctionService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Auction;Integrated Security=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

builder.Services.AddDbContext<AuctionDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllers();
builder.Services.AddScoped<IAuctionService, AuctionService.Services.AuctionService>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
