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
    public class AuthRepo : IAuthRepo
    {
        private readonly EmployeeInterviewContext _dbContext;

        public AuthRepo(EmployeeInterviewContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Employee> EmployeeExits(string email, string password)
        {
            var response = await _dbContext.Employees.Include(s => s.Role).FirstOrDefaultAsync(s => s.Email == email && s.Password == password);

            return response;
        }
    }
}
