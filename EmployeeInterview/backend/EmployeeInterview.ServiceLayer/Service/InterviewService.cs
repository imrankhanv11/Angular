using EmployeeInterview.DataAccessLayer.Interface;
using EmployeeInterview.DataAccessLayer.Models;
using EmployeeInterview.ServiceLayer.DTO1.Interview.Request;
using EmployeeInterview.ServiceLayer.DTO1.Interview.Response;
using EmployeeInterview.ServiceLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeInterview.ServiceLayer.Service
{
    public class InterviewService : IInterviewService
    {
        private readonly IInterviewRepo _repo;

        public InterviewService(IInterviewRepo repo)
        {
            _repo = repo;
        }

        public enum InterviewStatus
        {
            Pending = 1,
            Reject = 2,
            Select = 3
        }

        public async Task InterviewedCandtiateService(InterviwedMarkRequestDTO dto)
        {
            var interview = await _repo.GetInterviewDetials(dto.Id);

            if(interview == null)
            {
                throw new KeyNotFoundException("Interview not found");
            }

            interview.StatusId = dto.StatusId;
            interview.SoftSkillMark = dto.SoftSkillMark;
            interview.TechnicalSkillMark = dto.TechnicalSkillMark;
            interview.Commands = dto.Commands;
            interview.Pros = dto.Pros;
            interview.Cons = dto.Cons;

            await _repo.UpdateInterviewDetials(interview);

            if(dto.StatusId == (int)InterviewStatus.Select && dto.InterviewTypeId < 5)
            {
                var response = new Interview
                {
                    StatusId = (int)InterviewStatus.Pending,
                    InterviewTypeId = dto.InterviewTypeId + 1,
                    CandidateId = dto.CandidateId,
                };

                await _repo.UpdateInterviewDetials(response);
                
            }
        }

        public async Task AssignInterviewService(AssignInverviewRequestDTO dto)
        {
            var interview = await _repo.GetInterviewDetials(dto.Id);

            if(interview == null)
            {
                throw new KeyNotFoundException("Interview not found");
            }

            interview.DateOfInterview = dto.DateOfInterview;
            interview.InterviewerId = dto.InterviewerId;

            await _repo.AssignInterview(interview);
        }

        public async Task RejectCandidateService(int id)
        {
            var interview = await _repo.GetInterviewDetials(id);

            if (interview == null)
            {
                throw new KeyNotFoundException("Interview not found");
            }

            interview.StatusId = (int)InterviewStatus.Reject;

            await _repo.UpdateInterviewDetials(interview);

        }

        public async Task<IEnumerable<GetAllInterviewResponseDTO>> GetAllInterviewList()
        {
            var response = await _repo.GetAllInterviewList();

            var output = response.Select(s => new GetAllInterviewResponseDTO
            {
                Id = s.Id,

                InterviewTypeId = s.InterviewTypeId,
                InterviewTypeName = s.InterviewType != null ? s.InterviewType.Name : string.Empty,

                InterviewerId = s.InterviewerId,
                InterviewerName = s.Interviewer != null ? s.Interviewer.Name : string.Empty,

                CandidateId = s.CandidateId,
                CandidateName = s.Candidate != null ? s.Candidate.Name : string.Empty,
                Email = s.Candidate.Email,

                StatusId = s.StatusId,
                StatusName = s.Status != null ? s.Status.Name : string.Empty,

                DateOfInterview = s.DateOfInterview != null
                        ? s.DateOfInterview
                        : (DateOnly?)null,

                Commands = s.Commands,
                Pros = s.Pros,
                Cons = s.Cons,

                SoftSkillMark = s.SoftSkillMark,
                TechnicalSkillMark = s.TechnicalSkillMark,
                Filepath = s.Candidate.ResumePath
            }).ToList();

            return output;

        }
    }
}
