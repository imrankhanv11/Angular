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
    public class CandidateRepository : ICandidateRepository
    {
        private readonly EmployeeInterviewContext _context;
        public CandidateRepository(EmployeeInterviewContext context) { 
        _context = context;
        }

        public async Task AddCandidate(Candidate newCandidate)
        {
            await _context.Candidates.AddAsync(newCandidate);
            await _context.SaveChangesAsync();
        }

        public Task<bool> CheckExitsCandidateEmail(string email)
        {
            return _context.Candidates.AnyAsync(x => x.Email == email);
        }
    }
}
