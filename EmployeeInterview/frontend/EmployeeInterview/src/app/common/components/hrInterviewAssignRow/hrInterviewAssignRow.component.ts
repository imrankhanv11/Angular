import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GetAllInterviewResponse } from '../../type/interviewResponseType';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tr[app-interview-assign-row]',
    templateUrl: 'hrInterviewAssignRow.coponent.html',
    standalone: true,
    imports: [CommonModule]
})
export class HRInterviewAssignRowComponent {
    @Input() interview!: GetAllInterviewResponse;
    @Input() index!: number;
    @Output() assign = new EventEmitter<GetAllInterviewResponse>();

    onClickModel() {
        this.assign.emit(this.interview);
    }

    openFile(filename: string) {
        if (filename) {
            const serverUrl = 'https://localhost:7244/';
            window.open(serverUrl + 'uploads/' + filename, '_blank');
        }
    }
}
