export interface GetAllInterviewResponse {
    id: number;
    interviewTypeId: number;
    interviewTypeName: string;
    interviewerId?: number | null;
    interviewerName: string;
    candidateId: number;
    candidateName: string;
    statusId: number;
    statusName: string;
    email: string;
    dateOfInterview?: string | null;
    commands?: string | null;
    pros?: string | null;
    cons?: string | null;
    softSkillMark?: number | null;
    technicalSkillMark?: number | null;
    filepath: string;
}
