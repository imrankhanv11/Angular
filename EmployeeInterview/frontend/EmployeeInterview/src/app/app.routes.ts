import { Routes } from '@angular/router';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { NotFoundComponent } from './pages/notFound/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { HRPendingTaskCompoenent } from './pages/hr-CandidatePendingInterview/hr-CandidatePendingInterview.component';
import { HRGuard } from './guard/HRGuard';
import { HrInterviewAssignComponent } from './pages/hrInterviewAssign/hrInterviewAssign.component';
import { CandidateAddComponenet } from './pages/candidateAdd/candidateAdd.component';
import { EmployeePendingTask } from './pages/employeePending/employeePending.component';
import { NavigateGuard } from './guard/navigateGuard';
import { EmplyeeGuard } from './guard/employeeGuard';
import { HRCandidateSelectedComponenet } from './pages/hrCandidateSelected/hrCandidateSelected.component';

export const routes: Routes = [
    // Home
    { path: "", component: LoginComponent },

    // HR
    { path: "hrpendingtask", component: HRPendingTaskCompoenent, canActivate: [HRGuard] },
    { path: "hrcandidatpending", component: HrInterviewAssignComponent, canActivate: [NavigateGuard] },
    { path: "candidateadd", component: CandidateAddComponenet, canActivate: [HRGuard] },
    { path: "selectedCandidates", component: HRCandidateSelectedComponenet, canActivate: [HRGuard] },

    // Employe
    { path: "employeepending", component: EmployeePendingTask, canActivate: [EmplyeeGuard] },
    {
        path: 'interview/:id/:candidateId/:interviewTypeId',
        loadComponent: () => import('./pages/employeeEvaluate/employeeEvaluate.component')
            .then(m => m.InterviewAssessmentComponent), canActivate: [EmplyeeGuard]
    },

    // Helper pages
    { path: "unauthorized", component: UnauthorizedComponent },
    { path: "**", component: NotFoundComponent }
];
