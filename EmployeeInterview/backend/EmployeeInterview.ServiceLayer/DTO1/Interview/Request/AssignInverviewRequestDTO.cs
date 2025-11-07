using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeInterview.ServiceLayer.DTO1.Interview.Request
{
    public class AssignInverviewRequestDTO
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int InterviewerId { get; set; }

        [Required]
        public DateOnly DateOfInterview { get; set; }
    }
}
