using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using UserService.Auth;

namespace UserService.Services
{
    public interface IAuthenticateService 
    {
        public Task<object?> Login(LoginModel loginModel);
        public Task<bool> Register(RegisterModel registerModel);
        public Task<bool> RegisterAdmin(RegisterModel registerModel);
        public Task<bool> Update(UpdateModel updateModel);
        public Task<bool> Delete(string email);

        Task<User> GetUserAsync(string userId);
    }
}
