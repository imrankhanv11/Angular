using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeInterview.ServiceLayer.DTO1.Interview.Request
{
    public class InterviwedMarkRequestDTO
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int CandidateId { get; set; }

        [Required]
        public string? Commands { get; set; }

        [Required]
        public string? Pros { get; set; }

        [Required]
        public int InterviewTypeId { get; set; }

        [Required]
        public string? Cons { get; set; }

        [Required]
        public int? SoftSkillMark { get; set; }

        [Required]
        public int? TechnicalSkillMark { get; set; }

        [Required]
        public int StatusId { get; set; }
    }
}
