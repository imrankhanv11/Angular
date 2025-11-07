using System;
using System.Collections.Generic;

namespace EmployeeInterview.DataAccessLayer.Models;

public partial class Candidate
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string CurrentEmployer { get; set; } = null!;

    public string CurrentDesignation { get; set; } = null!;

    public int TotalExperience { get; set; }

    public int NoticePeriod { get; set; }

    public string? Sources { get; set; }

    public int? RefferredBy { get; set; }

    public string? ResumePath { get; set; }

    public virtual ICollection<Interview> Interviews { get; set; } = new List<Interview>();

    public virtual Employee? RefferredByNavigation { get; set; }
}
