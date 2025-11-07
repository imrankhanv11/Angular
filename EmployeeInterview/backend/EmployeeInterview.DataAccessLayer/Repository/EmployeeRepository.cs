using EmployeeInterview.DataAccessLayer.Data;
using EmployeeInterview.DataAccessLayer.Interface;
using EmployeeInterview.DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeInterview.DataAccessLayer.Repository
{
    public class EmployeeRepository:IEmployeeRepository
    {
        private readonly EmployeeInterviewContext _employeeInterViewcontext;

        public EmployeeRepository(EmployeeInterviewContext employeeInterviewContext)
        {
            _employeeInterViewcontext = employeeInterviewContext;
        }

        public async Task<List<Employee>> GetAllEmployees()
        {
            return await _employeeInterViewcontext.Employees.Include(x=>x.Role).Where(emp =>  emp.Role.RoleName != "HR").ToListAsync();
        }

        public async Task<IEnumerable<Interview>> GetAllEmployeeById(int id)
        {
            return await _employeeInterViewcontext.Interviews.Include(s => s.Candidate).Include(s => s.InterviewType).Where(s=> s.InterviewerId == id && s.StatusId == 1).ToListAsync();
        }

    }
}
