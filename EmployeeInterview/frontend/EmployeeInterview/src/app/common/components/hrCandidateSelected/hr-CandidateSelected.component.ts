import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllInterviewResponse } from '../../type/interviewResponseType';

@Component({
    selector: 'tr[app-candidate-selected-row]',
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'hr-CandidateSelectedRow.componet.html',
})
export class  HRcandateSelectedRowComponent {
    @Input() interview!: GetAllInterviewResponse;
    @Input() index!: number;

    openFile(filename: string) {
        if (filename) {
            const serverUrl = 'https://localhost:7244/';
            window.open(serverUrl + 'uploads/' + filename, '_blank');
        }
    }
}