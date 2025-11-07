using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

// Ensure you have installed the NuGet package: Microsoft.AspNetCore.Http.Abstractions
namespace EmployeeInterview.ServiceLayer.DTOs
{
     public  class CandidateDTO
     {
        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string CurrentEmployer { get; set; } = null!;

        public string CurrentDesignation { get; set; } = null!;

        public string TotalExperience { get; set; }

        public string NoticePeriod { get; set; }

        public string? Sources { get; set; }

        public string? RefferredBy { get; set; }

        public IFormFile? ResumePath { get; set; }
    }
}
