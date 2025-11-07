using System;
using System.Collections.Generic;

namespace EmployeeInterview.DataAccessLayer.Models;

public partial class InterviewStatus
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Interview> Interviews { get; set; } = new List<Interview>();
}
