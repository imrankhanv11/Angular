import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { empInterviewType } from '../../type/empInterviewRespons';
import { Router } from '@angular/router';

@Component({
    selector: 'tr[app-Empinterview-pending-row]',
    imports: [CommonModule],
    standalone: true,
    templateUrl: 'empPendingRow.componenet.html',
})
export class EmpPendingComponentRow {
    @Input() interview!: empInterviewType;
    @Input() index!: number;

    private router = inject(Router);

    onClickInterview() {
        console.log(this.interview.interviewTypeId);
        this.router.navigate(['/interview', this.interview.id, this.interview.candidateId, this.interview.interviewTypeId]);
    }

    openFile(filename: string) {
        if (filename) {
            const serverUrl = 'https://localhost:7244/';
            window.open(serverUrl + 'uploads/' + filename, '_blank');
        }
    }
}
