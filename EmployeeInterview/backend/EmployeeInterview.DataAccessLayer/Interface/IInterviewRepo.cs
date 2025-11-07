using EmployeeInterview.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeInterview.DataAccessLayer.Interface
{
    public interface IInterviewRepo
    {
        Task<Interview> GetInterviewDetials(int id);

        Task UpdateInterviewDetials(Interview interview);

        Task AddInterviewForNextRound(Interview interview); 

        Task AssignInterview(Interview interview);

        Task<IEnumerable<Interview>> GetAllInterviewList();
    }
}
