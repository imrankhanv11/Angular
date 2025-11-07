using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeInterview.ServiceLayer.DTOs
{
    public class InterViewDTO
    {
        public int Id { get; set; }

        public string InterviewTypeName { get; set; }

        public int InterviewTypeId { get; set; }

        public int CandidateId { get; set; }

        public string CandidateName { get; set; }

        public int StatusId { get; set; }

        public DateOnly? DateOfInterview { get; set; }

        public string Filepath { get; set; }

    }
}
