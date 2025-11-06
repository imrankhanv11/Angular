import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InterviewService } from "../../services/interview.service";
import { GetAllInterviewResponse } from "../../common/type/interviewResponseType";
import { Status } from "../../common/enum/status";
import { InterviewType } from "../../common/enum/interviewType";
import { HRcandateSelectedRowComponent } from "../../common/components/hrCandidateSelected/hr-CandidateSelected.component";

@Component({
    selector: "app-hrpending",
    imports: [CommonModule, HRcandateSelectedRowComponent],
    standalone: true,
    templateUrl: 'hrCandidateSelected.component.html'
})
export class HRCandidateSelectedComponenet implements OnInit {
    SelectedCandidates: GetAllInterviewResponse[] = [];

    private Interview: InterviewService = inject(InterviewService);

    ngOnInit(): void {
        this.onHrPending();
    }

    onHrPending() {
        this.Interview.getAllInterview().subscribe({
            next: (response) => {
                this.SelectedCandidates = response.filter(s =>
                    s.statusId === Status.select
                    &&
                    s.interviewTypeId === InterviewType.Final_F2F_Interview
                    &&
                    s.dateOfInterview !== null
                );
            }
        });
    }
}