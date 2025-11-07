using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeInterview.ServiceLayer.DTO1.Interview.Response
{
    public class GetAllInterviewResponseDTO
    {
        public int Id { get; set; }

        public int InterviewTypeId { get; set; }
        
        public string InterviewTypeName { get; set; }

        public int? InterviewerId { get; set; }

        public string InterviewerName { get; set; }

        public int CandidateId { get; set; }

        public string CandidateName { get; set; }

        public string Email {  get; set; }

        public int StatusId { get; set; }

        public string StatusName { get; set; }

        public DateOnly? DateOfInterview { get; set; }

        public string? Commands { get; set; }

        public string? Pros { get; set; }

        public string? Cons { get; set; }

        public int? SoftSkillMark { get; set; }

        public int? TechnicalSkillMark { get; set; }

        public string Filepath { get; set; }

    }
}
