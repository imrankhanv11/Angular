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
    public class InterviewRepo : IInterviewRepo
    {
        private readonly EmployeeInterviewContext _context;

        public InterviewRepo(EmployeeInterviewContext context)
        {
            _context = context;
        }

        public enum InterviewStatus
        {
            Pending = 1,
            Reject = 2,
            Select = 3
        }

        public async Task AddInterviewForNextRound(Interview interview)
        {
            await  _context.Interviews.AddAsync(interview);

            await _context.SaveChangesAsync();
        }

        public async Task AssignInterview(Interview interview)
        {
            _context.Interviews.Update(interview);

            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Interview>> GetAllInterviewList()
        {
            var response = await _context.Interviews
                .Include(s=> s.Status)
                .Include(s=> s.Candidate)
                .Include(s=> s.InterviewType)
                .Include(s=> s.Interviewer)
                //.Where(s => s.StatusId == (int)InterviewStatus.Pending)
                .ToListAsync();

            return response;
        }

        public async Task<Interview> GetInterviewDetials(int id)
        {
            var interview = await _context.Interviews.FirstOrDefaultAsync(s=> s.Id == id);

            return interview;
        }

        public async Task UpdateInterviewDetials(Interview interview)
        {
             _context.Interviews.Update(interview);

            await _context.SaveChangesAsync();
        }
    }
}
