import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeMarkRequest } from '../../common/type/empInveriewMarkRequest';
import { EmployeeInterviewService } from '../../services/empInterview.service';

@Component({
    selector: 'app-interview-assessment',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './employeeEvaluate.component.html',
})
export class InterviewAssessmentComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private fb = inject(FormBuilder);
    private employee: EmployeeInterviewService = inject(EmployeeInterviewService);
    private router: Router = inject(Router);

    interviewId!: number;
    candidateId!: number;
    interviewTypeId!: number;
    assessmentForm!: FormGroup;

    // Rating 
    ratingOptions = [1, 2, 3, 4, 5];

    ratingLabels = [
        'Below Satisfactory',
        'Satisfactory',
        'Good',
        'Very Good',
        'Excellent'
    ];

    ngOnInit(): void {
        this.interviewId = Number(this.route.snapshot.paramMap.get('id'));
        this.candidateId = Number(this.route.snapshot.paramMap.get('candidateId'));
        this.interviewTypeId = Number(this.route.snapshot.paramMap.get('interviewTypeId'));
        
        this.initForm();
    }

    private initForm(): void {
        this.assessmentForm = this.fb.group({
            // Technical Skills
            technicalSkills: this.fb.group({
                concept: ['', [Validators.required]],
                technical: ['', [Validators.required]],
                domain: ['', [Validators.required]],
                skillSet: ['', [Validators.required]],
                analyticalSkills: ['', [Validators.required]],
                problemSolving: ['', [Validators.required]],
                focusedAlert: ['', [Validators.required]],
                othersTechnical: ['', [Validators.required]]
            }),

            // Soft Skills
            softSkills: this.fb.group({
                communication: ['', [Validators.required]],
                aptitude: ['', [Validators.required]],
                leadership: ['', [Validators.required]],
                initiative: ['', [Validators.required]],
                willingnessToLearn: ['', [Validators.required]],
                attitude: ['', [Validators.required]],
                listeningSkills: ['', [Validators.required]],
                othersSoft: ['', [Validators.required]]
            }),

            // Overall evaluation
            comments: ['', [Validators.required, Validators.maxLength(500)]],
            pros: ['', [Validators.required, Validators.maxLength(200)]],
            cons: ['', [Validators.required, Validators.maxLength(200)]],
            statusId: ['', Validators.required]
        });
    }

    //  overall technical rating
    get technicalOverall(): number {
        const techSkills = this.assessmentForm?.get('technicalSkills')?.value;
        if (!techSkills) return 0;

        const values = Object.values(techSkills)
            .filter(val => val !== '' && val !== null)
            .map(val => Number(val))
            .filter(val => !isNaN(val) && val >= 1 && val <= 5);

        return values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0)) : 0;
    }

    // overall soft skills rating
    get softSkillsOverall(): number {
        const softSkills = this.assessmentForm?.get('softSkills')?.value;
        if (!softSkills) return 0;

        const values = Object.values(softSkills)
            .filter(val => val !== '' && val !== null)
            .map(val => Number(val))
            .filter(val => !isNaN(val) && val >= 1 && val <= 5);

        return values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0)) : 0;
    }


    // Get rounded technical overall
    get roundedTechnicalOverall(): number {
        return this.technicalOverall;
    }

    // Get rounded soft skills overall
    get roundedSoftSkillsOverall(): number {
        return this.softSkillsOverall;
    }

    get f() {
        return this.assessmentForm.controls;
    }

    get technicalSkills() {
        return (this.assessmentForm.get('technicalSkills') as FormGroup).controls;
    }

    get softSkills() {
        return (this.assessmentForm.get('softSkills') as FormGroup).controls;
    }

    getRatingLabel(rating: number): string {
        return this.ratingLabels[rating - 1] || '';
    }

    onSubmitForm() {
        if (this.assessmentForm.invalid) {
            this.assessmentForm.markAllAsTouched();
            return;
        }

        const payload: EmployeeMarkRequest = {
            id: this.interviewId,
            technicalSkillMark: this.technicalOverall,
            softSkillMark: this.softSkillsOverall,
            pros: this.assessmentForm.value.pros,
            cons: this.assessmentForm.value.cons,
            statusId: this.assessmentForm.value.statusId,
            commands: this.assessmentForm.value.comments,
            interviewTypeId: this.interviewTypeId,
            candidateId: this.candidateId,
        };

        this.employee.evaluvateInterview(payload).subscribe();

        this.router.navigate(['/employeepending']);
    }
}