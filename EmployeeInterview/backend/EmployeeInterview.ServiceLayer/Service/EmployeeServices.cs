using EmployeeInterview.DataAccessLayer.Interface;
using EmployeeInterview.ServiceLayer.DTOs;
using EmployeeInterview.ServiceLayer.Interface;

namespace EmployeeInterview.ServiceLayer.Service
{
    public class EmployeeServices:IEmployeeServices
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeServices(IEmployeeRepository employeeRepository)
        {
            _employeeRepository= employeeRepository;
        }
        public async Task<List<EmployeeDTO>> GetEmployees()
        {
            var data = await _employeeRepository.GetAllEmployees();
            if (data != null)
            {
                return data.Select(x => new EmployeeDTO
                {
                    Id = x.Id,
                    Name = x.Name,
                }).ToList();
            }
            return new List<EmployeeDTO>();
        }

        public async Task<List<InterViewDTO>> GetEmployeeInterViews(int id)
        {
            var interviews= await _employeeRepository.GetAllEmployeeById(id);

            if(interviews == null)
            {
                return new List<InterViewDTO>();
            }
            var result = interviews.Select(s => new InterViewDTO
            {
                Id =s.Id,
                CandidateId = s.CandidateId,
                CandidateName = s.Candidate.Name,
                InterviewTypeId = s.InterviewTypeId,
                DateOfInterview = s.DateOfInterview,
                InterviewTypeName = s.InterviewType.Name,
                StatusId = s.StatusId,
                Filepath = s.Candidate.ResumePath
            }).ToList();

            return result;
        }   
    }
}
