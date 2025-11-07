using EmployeeInterview.ServiceLayer.DTO1.Interview.Request;
using EmployeeInterview.ServiceLayer.DTO1.Interview.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeInterview.ServiceLayer.Interface
{
    public interface IInterviewService
    {
        Task InterviewedCandtiateService(InterviwedMarkRequestDTO dto);

        Task AssignInterviewService(AssignInverviewRequestDTO dto);

        Task RejectCandidateService(int id);

        Task<IEnumerable<GetAllInterviewResponseDTO>> GetAllInterviewList();
    }
}
