using EmployeeInterview.DataAccessLayer.Models;

namespace EmployeeInterview.DataAccessLayer.Interface
{
    public interface ICandidateRepository
    {
        Task AddCandidate(Candidate newCandidate);

        Task<bool> CheckExitsCandidateEmail(string email);
    }
}
