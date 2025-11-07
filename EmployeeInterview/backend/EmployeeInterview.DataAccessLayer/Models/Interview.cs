using System;
using System.Collections.Generic;

namespace EmployeeInterview.DataAccessLayer.Models;

public partial class Interview
{
    public int Id { get; set; }

    public int InterviewTypeId { get; set; }

    public int? InterviewerId { get; set; }

    public int CandidateId { get; set; }

    public int StatusId { get; set; }

    public DateOnly? DateOfInterview { get; set; }

    public string? Commands { get; set; }

    public string? Pros { get; set; }

    public string? Cons { get; set; }

    public int? SoftSkillMark { get; set; }

    public int? TechnicalSkillMark { get; set; }

    public virtual Candidate Candidate { get; set; } = null!;

    public virtual InterviewType InterviewType { get; set; } = null!;

    public virtual Employee Interviewer { get; set; } = null!;

    public virtual InterviewStatus Status { get; set; } = null!;
}
