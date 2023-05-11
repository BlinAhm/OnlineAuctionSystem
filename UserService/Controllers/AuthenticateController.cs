using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Xml.Linq;
using UserService.Auth;
using UserService.Services;

namespace UserService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IAuthenticateService _authenticateService;

        public AuthenticateController(
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            IAuthenticateService authenticateService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _authenticateService = authenticateService;
        }

        // Get All Users method
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return _userManager.Users.ToList();
        }

        // Get User By Email method
        [HttpGet("{email}")]
        /*[Authorize(Roles = UserRoles.Admin)]*/
        public async Task<ActionResult<User>> GetByEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "User not found." });
            return user;
        }

        // Login User method
        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromForm] LoginModel model)
        {
            var response = await _authenticateService.Login(model);
            if (response != null)
                return Ok(response);
            return Unauthorized();
        }

        // Register User method
        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public async Task<IActionResult> Register([FromForm] RegisterModel model)
        {
            if (await _userManager.FindByEmailAsync(model.Email) != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            var response = await _authenticateService.Register(model);
            if (response)
                return Ok(new Response { Status = "Success", Message = "User created successfully!" });
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromForm] RegisterModel model)
        {
            var response = await _authenticateService.RegisterAdmin(model);

            if (await _userManager.FindByEmailAsync(model.Email) != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });
            if (response)
                return Ok(new Response { Status = "Success", Message = "User created successfully!" });
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

        }

        // Update User method
        [HttpPut]
        public async Task<ActionResult> Update(UpdateModel updateModel)
        {
            var response = await _authenticateService.Update(updateModel);

            if (response)
                return Ok(new Response { Status = "Success", Message = "User updated successfully!" });
            return BadRequest(new Response { Status = "Error", Message = "Failed to update user!" });
        }


        // Delete User method
        [HttpDelete("{email}")]
        public async Task<ActionResult> Delete(string email)
        {
            var response = await _authenticateService.Delete(email);

            if (response)
                return Ok(new Response { Status = "Success", Message = "User deleted successfully!" });
            return BadRequest(new Response { Status = "Error", Message = "Failed to delete user!" });
        }
    }
}
