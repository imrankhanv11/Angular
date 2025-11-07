using EmployeeInterview.ServiceLayer.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EmployeeInterview.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeServices _employeeServices;
        public EmployeeController(IEmployeeServices employeeServices) { 
        _employeeServices = employeeServices;
        }
        [HttpGet]

        [Authorize(Roles = "HR")]
        public async Task<IActionResult> GetAllEmployees()
        {
            var result = await _employeeServices.GetEmployees();
            return Ok(result);
        }

        [HttpGet("interviews")]
        [Authorize(Roles = "Employee")]
        [Authorize]
        public async Task<IActionResult> GetInterviews()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier);
            int id = Convert.ToInt32(userId.Value);

            var response = await _employeeServices.GetEmployeeInterViews(id);
            return Ok(response);
        }
    }
}
