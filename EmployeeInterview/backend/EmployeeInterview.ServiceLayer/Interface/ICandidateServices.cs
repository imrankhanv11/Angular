using EmployeeInterview.ServiceLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeInterview.ServiceLayer.Interface
{
    public interface ICandidateServices
    {
        Task AddNewCandidate(CandidateDTO newCandidate);
    }
}
