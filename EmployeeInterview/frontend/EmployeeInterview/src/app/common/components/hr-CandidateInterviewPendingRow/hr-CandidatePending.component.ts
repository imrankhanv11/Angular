import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllInterviewResponse } from '../../type/interviewResponseType';

@Component({
    selector: 'tr[app-CandidatePending-row]',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hr-CandidatePending.component.html',
})
export class HRCandidatePendingRow {
    @Input() interview!: GetAllInterviewResponse;
    @Input() index!: number;

    openFile(filename: string) {
        if (filename) {
            const serverUrl = 'https://localhost:7244/';
            window.open(serverUrl + 'uploads/' + filename, '_blank');
        }
    }
}