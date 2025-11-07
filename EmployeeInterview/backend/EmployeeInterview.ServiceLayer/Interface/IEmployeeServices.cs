using EmployeeInterview.ServiceLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeInterview.ServiceLayer.Interface
{
    public interface IEmployeeServices
    {
        Task<List<EmployeeDTO>> GetEmployees();
        Task<List<InterViewDTO>> GetEmployeeInterViews(int id);
    }
}
