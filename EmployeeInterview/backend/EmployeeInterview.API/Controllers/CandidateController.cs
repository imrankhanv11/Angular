using EmployeeInterview.ServiceLayer.DTOs;
using EmployeeInterview.ServiceLayer.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeInterview.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {

        
        private readonly ICandidateServices _candidateServices;
        public CandidateController(ICandidateServices candidateServices)
        {
            _candidateServices = candidateServices;
        }
        [HttpPost]
        [Authorize(Roles ="HR")]
        public async Task<IActionResult> AddCandidate([FromForm] CandidateDTO newCandidate)
        {
            await _candidateServices.AddNewCandidate(newCandidate);
            return Ok(new {message="Candidated Added Successfully"});
        }
    }
}
