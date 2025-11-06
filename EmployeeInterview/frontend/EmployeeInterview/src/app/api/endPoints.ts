export const publicEnpoints = {
    Login: `/AuthContorller/login`,
    Refresh: `/AuthContorller/RefreshToken`
}

export const privateEnpoints = {
    AddCandidate: `/Candidate`,
    GetAllEmp: `/Employee`,
    GetAllInterviewHR: `/Interview/GetAllInterview`,
    AssignInterview :`/Interview/arrangeInterview`,
    EmpInterviewGet : `/Employee/interviews`,
    EmpInterviewMarks: `/Interview/employeeInterviewed`
}