using EmployeeInterview.ServiceLayer.DTO1.Interview.Request;
using EmployeeInterview.ServiceLayer.DTO1.Interview.Response;
using EmployeeInterview.ServiceLayer.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeInterview.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InterviewController : ControllerBase
    {
        private readonly IInterviewService _service;

        public InterviewController(IInterviewService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("GetAllInterview")]
        [Authorize(Roles = "HR")]

        public async Task<ActionResult<IEnumerable<GetAllInterviewResponseDTO>>> InterViewList()
        {
            var response = await _service.GetAllInterviewList();

            return Ok(response);
        }

        [HttpPatch]
        [Route("employeeInterviewed")]
        [Authorize(Roles = "Employee")]

        public async Task<IActionResult> InterviewedCanditdate([FromBody] InterviwedMarkRequestDTO dto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _service.InterviewedCandtiateService(dto);

            return Ok();
        }

        [HttpPatch]
        [Route("arrangeInterview")]
        [Authorize(Roles ="HR")]
        public async Task<IActionResult> AssignInterviewDateAndInterviewer([FromBody] AssignInverviewRequestDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _service.AssignInterviewService(dto);

            return Ok();
        }

        [HttpPatch]
        [Route("rejectCandidate")]
        [Authorize(Roles = "HR,Employee")]
        public async Task<IActionResult> RejectCandidate([FromBody]  RejectCandidateRequestDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _service.RejectCandidateService(dto.Id);

            return Ok();
        }
    }
}
