import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InterviewService } from "../../services/interview.service";
import { GetAllInterviewResponse } from "../../common/type/interviewResponseType";
import { Status } from "../../common/enum/status";
import { InterviewType } from "../../common/enum/interviewType";
import { HRCandidatePendingRow } from "../../common/components/hr-CandidateInterviewPendingRow/hr-CandidatePending.component";

@Component({
    selector: "app-hrpending",
    imports: [CommonModule, HRCandidatePendingRow],
    standalone: true,
    templateUrl: './hr-CandidatePendingInterview.component.html'
})
export class HRPendingTaskCompoenent implements OnInit {
    hrPending: GetAllInterviewResponse[] = [];

    private Interview: InterviewService = inject(InterviewService);

    ngOnInit(): void {
        this.onHrPending();
    }

    onHrPending() {
        this.Interview.getAllInterview().subscribe({
            next: (response) => {
                this.hrPending = response.filter(s => 
                    s.statusId === Status.pending 
                    && 
                    s.dateOfInterview !== null
                );
            }
        });
    }
}