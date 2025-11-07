using System;
using System.Collections.Generic;
using EmployeeInterview.DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeInterview.DataAccessLayer.Data;

public partial class EmployeeInterviewContext : DbContext
{
    public EmployeeInterviewContext()
    {
    }

    public EmployeeInterviewContext(DbContextOptions<EmployeeInterviewContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Candidate> Candidates { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Interview> Interviews { get; set; }

    public virtual DbSet<InterviewStatus> InterviewStatuses { get; set; }

    public virtual DbSet<InterviewType> InterviewTypes { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Candidate>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Candidat__3214EC07D7D6E08E");

            entity.ToTable("Candidate");

            entity.HasIndex(e => e.Email, "UQ_Candidate_Email").IsUnique();

            entity.Property(e => e.CurrentDesignation)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.CurrentEmployer)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.ResumePath).IsUnicode(false);
            entity.Property(e => e.Sources)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.RefferredByNavigation).WithMany(p => p.Candidates)
                .HasForeignKey(d => d.RefferredBy)
                .HasConstraintName("FK__Candidate__Reffe__5070F446");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Employee__3214EC079C9B295A");

            entity.ToTable("Employee");

            entity.Property(e => e.Email)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(30)
                .IsUnicode(false);

            entity.HasOne(d => d.Role).WithMany(p => p.Employees)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Employee__RoleId__4D94879B");
        });

        modelBuilder.Entity<Interview>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Intervie__3214EC078067DD23");

            entity.Property(e => e.Commands)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Cons)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Pros)
                .HasMaxLength(200)
                .IsUnicode(false);

            entity.HasOne(d => d.Candidate).WithMany(p => p.Interviews)
                .HasForeignKey(d => d.CandidateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Interview__Candi__5629CD9C");

            entity.HasOne(d => d.InterviewType).WithMany(p => p.Interviews)
                .HasForeignKey(d => d.InterviewTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Interview__Inter__5535A963");

            entity.HasOne(d => d.Interviewer).WithMany(p => p.Interviews)
                .HasForeignKey(d => d.InterviewerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Interview__Inter__571DF1D5");

            entity.HasOne(d => d.Status).WithMany(p => p.Interviews)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Interview__Statu__5812160E");
        });

        modelBuilder.Entity<InterviewStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Intervie__3214EC077AEF2ABE");

            entity.ToTable("InterviewStatus");

            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<InterviewType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Intervie__3214EC07CE534450");

            entity.ToTable("InterviewType");

            entity.Property(e => e.Name)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Role__3214EC07ACBFA5E4");

            entity.ToTable("Role");

            entity.Property(e => e.RoleName)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
