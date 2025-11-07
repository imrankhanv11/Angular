using EmployeeInterview.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeInterview.DataAccessLayer.Interface
{
    public interface IAuthRepo 
    {
        Task<Employee> EmployeeExits(string email, string password);

    }
}
