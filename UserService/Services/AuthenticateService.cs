using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserService.Auth;

namespace UserService.Services
{
    public class AuthenticateService : IAuthenticateService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        public AuthenticateService(
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        public async Task<object?> Login(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var token = GetToken(authClaims);

                return new
                {
                    admin = userRoles.ToArray(),
                    userId = user.Id,
                    user = new[] { user.UserName, user.Email },
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                };
            }
            return null;
        }
        public async Task<bool> Register(RegisterModel model)
        {
            User user = new()
            {
                Name = model.Name,
                Surname = model.Surname,
                UserName = model.Username,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                SecurityStamp = Guid.NewGuid().ToString()
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return false;

            return true;
        }
        public async Task<bool> RegisterAdmin([FromForm] RegisterModel model)
        {
            User user = new()
            {
                Name = model.Name,
                Surname = model.Surname,
                UserName = model.Username,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                SecurityStamp = Guid.NewGuid().ToString()

            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return false;

            if (!await _roleManager.RoleExistsAsync(UserRoles.Admin))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            if (!await _roleManager.RoleExistsAsync(UserRoles.User))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.User));

            if (await _roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await _userManager.AddToRoleAsync(user, UserRoles.Admin);
            }
            if (await _roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await _userManager.AddToRoleAsync(user, UserRoles.User);
            }

            return true;
        }
        public async Task<bool> Update(UpdateModel updateModel)
        {
            User user = await _userManager.FindByIdAsync(updateModel.Id);

            if (user == null)
                return false;

            user.Name = updateModel.Name;
            user.Surname = updateModel.Surname;
            user.UserName = updateModel.Username;
            user.Email = updateModel.Email;
            user.PhoneNumber = updateModel.PhoneNumber;

            await _userManager.UpdateAsync(user);
            if (user == await _userManager.FindByIdAsync(updateModel.Id))
                return true;
            return false;
        }
        public async Task<bool> Delete(string email)
        {
            User user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return false;
            await _userManager.DeleteAsync(user);

            if (await _userManager.FindByEmailAsync(email) == null)
                return true;
            return false;
        }
        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}
