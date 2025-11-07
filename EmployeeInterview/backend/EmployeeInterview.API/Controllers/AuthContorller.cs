using EmployeeInterview.ServiceLayer.DTO1.Auth.Request;
using EmployeeInterview.ServiceLayer.DTO1.Auth.Response;
using EmployeeInterview.ServiceLayer.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeInterview.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthContorller : ControllerBase
    {
        private readonly IAuthService _service;

        public AuthContorller(IAuthService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var response = await _service.LoginUserService(dto);

            return Ok(response);
        }

        [HttpPost]
        [Route("RefreshToken")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<LoginResponseDTO>> RefreshToken([FromBody] RefreshTokenRequestDTO dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }

            var output = await _service.RefreshTokenService(dto.RefreshToken);

            return Ok(output);
        }
    }
}
