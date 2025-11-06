import { Component, computed, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetAllInterviewResponse } from '../../common/type/interviewResponseType';
import { InterviewService } from '../../services/interview.service';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { privateEnpoints } from '../../api/endPoints';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HRInterviewAssignRowComponent } from '../../common/components/hrInterviewAssignRow/hrInterviewAssignRow.component';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-hr-interview-assign',
    templateUrl: './hrInterviewAssign.component.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, HRInterviewAssignRowComponent]

})
export class HrInterviewAssignComponent implements OnInit {
    assignForm!: FormGroup;
    employees: any[] = [];
    selectedInterview!: GetAllInterviewResponse | null;
    pendingEmployee = computed(() =>
        this.Interview.interviews().filter(s => s.interviewerId === null && s.dateOfInterview === null)
    );
    showModal = false;

    private Interview: InterviewService = inject(InterviewService);

    private http: HttpClient = inject(HttpClient);
    private fb: FormBuilder = inject(FormBuilder);

    private baseUrl = 'https://localhost:7244/api';

    ngOnInit() {
        this.assignForm = this.fb.group({
            dateOfInterview: ['', [Validators.required, this.futureDateValidator]],
            interviewerId: ['', Validators.required]
        });

        this.loadEmployees();
        this.loadPendingInterviews();
    }

    get dateOfInterview() {
        return this.assignForm.get('dateOfInterview');
    }

    get interviewerId() {
        return this.assignForm.get('interviewerId');
    }

    futureDateValidator(control: AbstractControl): ValidationErrors | null {
        if (!control.value) return null;

        const selectedDate = new Date(control.value);
        const today = new Date();

        return selectedDate < today ? { pastDate: true } : null;
    }

    loadEmployees() {
        this.http.get<any[]>(`${this.baseUrl}${privateEnpoints.GetAllEmp}`)
            .subscribe({
                next: (res) => {
                    this.employees = res;
                },
                error: (err) => {
                    console.error('Error loading employees:', err);
                }
            });
    }

    loadPendingInterviews() {
        this.Interview.getAllInterview().subscribe();
    }

    openAssignModal(interview: GetAllInterviewResponse) {
        this.selectedInterview = interview;
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
        this.assignForm.reset();
    }

    submitAssign() {

        if (this.assignForm.invalid) {
            Object.keys(this.assignForm.controls).forEach(key => {
                this.assignForm.get(key)?.markAsTouched();
            });
            return;
        }


        const formValue = this.assignForm.value;

        if (this.selectedInterview === null) {
            console.log("missed interview id");
            return;
        }

        this.Interview.assignInterview(
            {
                id: this.selectedInterview.id,
                dateOfInterview: formValue.dateOfInterview,
                interviewerId: formValue.interviewerId
            }).subscribe();

        this.selectedInterview = null;
        this.showModal = false;
        this.assignForm.reset();
        console.log(formValue);
    }
}
