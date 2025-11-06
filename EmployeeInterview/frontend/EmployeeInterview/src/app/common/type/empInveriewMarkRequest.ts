export type EmployeeMarkRequest = {
    id: number,
    candidateId: number,
    commands: string,
    pros: string,
    interviewTypeId: number,
    cons: string,
    softSkillMark: number,
    technicalSkillMark: number,
    statusId: number
}