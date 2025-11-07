using System;
using System.Collections.Generic;

namespace EmployeeInterview.DataAccessLayer.Models;

public partial class Employee
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int RoleId { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public virtual ICollection<Candidate> Candidates { get; set; } = new List<Candidate>();

    public virtual ICollection<Interview> Interviews { get; set; } = new List<Interview>();

    public virtual Role Role { get; set; } = null!;
}
