using EmployeeInterview.DataAccessLayer.Interface;
using EmployeeInterview.DataAccessLayer.Models;
using EmployeeInterview.ServiceLayer.DTOs;
using EmployeeInterview.ServiceLayer.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeInterview.ServiceLayer.Service
{
    public class CandidateServices : ICandidateServices
    {
        private readonly ICandidateRepository _candidateRepository;
        public CandidateServices(ICandidateRepository candidateRepository)
        {
            _candidateRepository = candidateRepository;
        }

        public enum Interviews
        {
            InitialTelephonicInterview = 1,
            TechnicalTelephonicInterview = 2,
            TechnicalSystemTest = 3,
            TechnicalFaceToFaceInterview = 4,
            FinalFaceToFaceInterview = 5
        }
        public enum InterviewStatus
        {
            Pending = 1,
            Rejected = 2,
            Selected = 3
        }


        public async Task AddNewCandidate(CandidateDTO newCandidate)
        {
            if (newCandidate.ResumePath == null || newCandidate.ResumePath.Length == 0)
            {
                throw new ArgumentException("Resume File is Not found");
            }

            var checkExistsEmail = await _candidateRepository.CheckExitsCandidateEmail(newCandidate.Email);

            if (checkExistsEmail)
            {
                throw new ValidationException("Email id already Exits");
            }
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "root", "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var fileName = Path.GetFileName(newCandidate.ResumePath.FileName); 
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await newCandidate.ResumePath.CopyToAsync(stream);
            }

            var candidate = new Candidate
            {
                Name = newCandidate.Name,
                Email = newCandidate.Email,
                RefferredBy = newCandidate.RefferredBy != null ? Convert.ToInt32(newCandidate.RefferredBy) : null,
                CurrentDesignation = newCandidate.CurrentDesignation,
                CurrentEmployer = newCandidate.CurrentEmployer,
                NoticePeriod = Convert.ToInt32(newCandidate.NoticePeriod),
                TotalExperience = Convert.ToInt32(newCandidate.TotalExperience),
                ResumePath = fileName, 
                Sources = newCandidate.Sources,
                Interviews = new List<Interview>
                {
                    new Interview
                    {
                        InterviewTypeId = (int)Interviews.InitialTelephonicInterview,
                        StatusId = (int)InterviewStatus.Pending,
                    }
                }
            };

            await _candidateRepository.AddCandidate(candidate);

        }

    }
}
