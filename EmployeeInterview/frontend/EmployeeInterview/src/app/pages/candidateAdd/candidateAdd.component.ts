import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrors } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { CandidateService } from '../../services/candidate.service';
import { privateEnpoints } from '../../api/endPoints';
import { showErrorToast, showSuccessToast } from '../../utils/toast.util';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-candidate',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './candidateAdd.component.html',
    styleUrls: ['./candidateAdd.component.css']
})
export class CandidateAddComponenet implements OnInit {
    candidateForm!: FormGroup;
    submitted = false;
    employees: any[] = [];
    selectedFile: File | null = null;

    private baseUrl = 'https://localhost:7244/api';

    private http: HttpClient = inject(HttpClient);
    private fb: FormBuilder = inject(FormBuilder);
    private candidateService: CandidateService = inject(CandidateService);
    private router: Router = inject(Router);

    ngOnInit(): void {
        this.candidateForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
            email: ['', [Validators.required, Validators.email]],
            currentEmployer: ['', [Validators.required, Validators.maxLength(40)]],
            currentDesignation: ['', [Validators.required, Validators.maxLength(40)]],
            TotalExperience: ['', [Validators.required, this.nonNegativeValidator]],
            noticePeriod: ['', [Validators.required, this.nonNegativeValidator]],
            sources: ['', [Validators.maxLength(20)]],
            referredBy: [null],
            resumePath: [null, [Validators.required]],
            isFresher: [false]
        });

        this.loadEmployees();
    }

    onFresherChange(event: Event): void {
        const isChecked = (event.target as HTMLInputElement).checked;

        if (isChecked) {
            this.candidateForm.patchValue({
                currentEmployer: 'Fresher',
                currentDesignation: 'Fresher',
                TotalExperience: 0,
                noticePeriod: 0
            });

            this.candidateForm.get('currentEmployer')?.disable();
            this.candidateForm.get('currentDesignation')?.disable();
            this.candidateForm.get('TotalExperience')?.disable();
            this.candidateForm.get('noticePeriod')?.disable();

        } else {
            this.candidateForm.get('currentEmployer')?.enable();
            this.candidateForm.get('currentDesignation')?.enable();
            this.candidateForm.get('TotalExperience')?.enable();
            this.candidateForm.get('noticePeriod')?.enable();

            this.candidateForm.patchValue({
                currentEmployer: '',
                currentDesignation: '',
                TotalExperience: null,
                noticePeriod: null
            });
        }
    }

    get f() {
        return this.candidateForm.controls;
    }


    nonNegativeValidator(control: AbstractControl): ValidationErrors | null {
        if (control.value === null || control.value === undefined || control.value === '') {
            return null;
        }
        return control.value < 0 ? { nonNegative: true } : null;
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

    onFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files?.length) {
            this.selectedFile = input.files[0];
            this.f['resumePath'].setErrors(null);
        } else {
            this.selectedFile = null;
            this.f['resumePath'].setErrors({ required: true });
        }
    }


    onSubmit() {
        this.submitted = true;
        console.log("hello");

        if (this.candidateForm.invalid) {
            console.log("error");
            return;
        }

        const formData = new FormData();
        formData.append('Name', this.f['name'].value);
        formData.append('Email', this.f['email'].value);
        formData.append('CurrentEmployer', this.f['currentEmployer'].value);
        formData.append('CurrentDesignation', this.f['currentDesignation'].value);
        formData.append('TotalExperience', this.f['TotalExperience'].value);
        formData.append('NoticePeriod', this.f['noticePeriod'].value);
        formData.append('Sources', this.f['sources'].value || '');
        formData.append('RefferredBy', this.f['referredBy'].value || '');

        if (this.selectedFile) {
            formData.append('ResumePath', this.selectedFile);
        }

        this.candidateService.CandidateAdd(formData).subscribe({
            next: (res: any) => {
                showSuccessToast("Candidate Added Sucessfully");
                this.candidateForm.reset();
                this.submitted = false;
                this.selectedFile = null;
                this.router.navigate(["/hrcandidatpending"])

            },
            error: (error: any) => {
                showErrorToast(error.error.message);
            }
        });
    }
}
