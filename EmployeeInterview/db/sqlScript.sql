--CREATE DATABASE InterviewPortal;

CREATE TABLE [Role](
	Id INT IDENTITY(1,1) PRIMARY KEY,
	RoleName VARCHAR(30) NOT NULL
)
GO

CREATE TABLE [InterviewType](
	Id INT IDENTITY(1,1) PRIMARY KEY,
	[Name] VARCHAR(30) NOT NULL
)
Go

CREATE TABLE [Employee](
	Id INT IDENTITY(1,1) PRIMARY KEY,
	[Name] VARCHAR(30) NOT NULL,
	RoleId INT NOT NULL,
	Email VARCHAR(40) NOT NULL,
	[Password] VARCHAR(30) NOT NULL,
	FOREIGN KEY (RoleId) REFERENCES [Role](Id)
);
Go

CREATE TABLE [Candidate](
	Id INT IDENTITY(1,1) PRIMARY KEY,
	[Name] VARCHAR(30) NOT NULL,
	Email VARCHAR(40) NOT NULL,
	CurrentEmployer VARCHAR(40) NOT NULL,
	CurrentDesignation VARCHAR(40) NOT NULL,
	TotalExperience INT NOT NULL,
	NoticePeriod INT NOT NULL,
	Sources VARCHAR(20) NULL,
	RefferredBy INT NULL,
	HealthCondition VARCHAR(40) NULL,
	ResumeUrl VARCHAR(MAX) NULL,
	FOREIGN KEY (RefferredBy) REFERENCES [Employee](Id),
);
Go

ALTER TABLE [Candidate]
ADD CONSTRAINT UQ_Candidate_Email UNIQUE (Email);
GO

-- Remove the HealthCondition column
ALTER TABLE [Candidate]
DROP COLUMN HealthCondition;
GO

-- 2Rename the ResumeUrl column to ResumePath
EXEC sp_rename 'Candidate.ResumeUrl', 'ResumePath', 'COLUMN';
GO

CREATE TABLE [InterviewStatus](
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Name VARCHAR(20) NOT NULL,
);
Go

CREATE TABLE [Interviews](
	Id INT IDENTITY(1,1) PRIMARY KEY,
	InterviewTypeId INT NOT NULL,
	InterviewerId INT NOT NULL,
	CandidateId INT NOT NULL,
	StatusId INT NOT NULL,
	DateOfInterview DATE NOT NULL,
	Commands VARCHAR(200) NULL,
	Pros VARCHAR(200) NULL,
	Cons VARCHAR(200) NULL,
	SoftSkillMark INT NULL,
	TechnicalSkillMark INT NULL,
	FOREIGN KEY (InterviewTypeId) REFERENCES [InterviewType](Id),
	FOREIGN KEY (CandidateId) REFERENCES [Candidate](id),
	FOREIGN KEY (InterviewerId) REFERENCES [Employee](Id),
	FOREIGN KEY (StatusId) REFERENCES [InterviewStatus](Id),
);
Go

ALTER TABLE [Interviews]
ALTER COLUMN DateOfInterview DATE NULL;
GO


ALTER TABLE [Interviews]
ALTER COLUMN InterviewerId INT NULL;
GO


-- Insert role data
INSERT INTO [Role] (RoleName)
VALUES 
('HR'),
('Employee');
Go


-- Insert interview types
INSERT INTO [InterviewType] ([Name])
VALUES
('Initial Telephonic Interview'),
('Technical Telephonic Interview'),
('Technical System Test'),
('Technical F2F Interview'),
('Final F2F Interview');
Go

-- Insert status data
INSERT INTO [InterviewStatus] ([Name])
VALUES
('Pending'),
('Rejected'),
('Select');
Go

-- Insert 4 HRs
INSERT INTO [Employee] ([Name], RoleId, Email, [Password])
VALUES
('Ravi Kumar', 1, 'ravi.hr@example.com', 'ravi123'),
('Priya Sharma', 1, 'priya.hr@example.com', 'priya123'),
('Imran Khan', 1, 'imran.hr@example.com', 'imran123'),
('Imran Khan2', 1, 'imran01@gmail.com', 'Imran1@1234');
Go

-- Insert 10 Employees
INSERT INTO [Employee] ([Name], RoleId, Email, [Password])
VALUES
('Amit Verma', 2, 'amit.emp@example.com', 'amit123'),
('Sneha Reddy', 2, 'sneha.emp@example.com', 'sneha123'),
('Rahul Singh', 2, 'rahul.emp@example.com', 'rahul123'),
('Deepa Nair', 2, 'deepa.emp@example.com', 'deepa123'),
('Karthik Raj', 2, 'karthik.emp@example.com', 'karthik123'),
('Meena Iyer', 2, 'meena.emp@example.com', 'meena123'),
('Arjun Das', 2, 'arjun.emp@example.com', 'arjun123'),
('Vijay Patil', 2, 'vijay.emp@example.com', 'vijay123'),
('Nisha Jain', 2, 'nisha.emp@example.com', 'nisha123'),
('Suresh Rao', 2, 'suresh.emp@example.com', 'suresh123');
Go

INSERT INTO [Employee] ([Name], RoleId, Email, [Password])
VALUES
('Imran Khan V', 2, 'ImranEmp@gmail.com', 'Imran1@1234')
Go

UPDATE Employee 
SET [Password] = 'Imran1@1234';