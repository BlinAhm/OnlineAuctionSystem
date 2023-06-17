using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using UserService.Auth;
using UserService.Services;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

// Connection String
var connectionString = builder.Configuration.GetConnectionString("UserServiceContextConnection") ?? throw new InvalidOperationException("Connection string 'UserServiceContextConnection' not found.");

builder.Services.AddDbContext<UserServiceContext>(options =>
    options.UseSqlServer(connectionString));

// Identity
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<UserServiceContext>()
    .AddDefaultTokenProviders();

builder.Services.AddScoped<IAuthenticateService,AuthenticateService>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("default", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:8020").AllowAnyMethod().AllowAnyHeader();
    });
});

// Add Authentication

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
 {
     options.SaveToken = true;
     options.RequireHttpsMetadata = false;
     options.TokenValidationParameters = new TokenValidationParameters()
     {
         ValidateIssuer = true,
         ValidateAudience = true,
         ValidAudience = configuration["JWT:ValidAudience"],
         ValidIssuer = configuration["JWT:ValidIssuer"],
         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
     };
 });

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();
app.UseCors("default");
app.UseAuthentication();;

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
