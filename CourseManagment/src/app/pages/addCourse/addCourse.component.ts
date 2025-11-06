import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CourseAdd } from '../../common/types/courseAdd';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { addCourse } from '../../store/course/course.actions';
import { selectAddCourseFailed, selectAddCourseSuccess, selectCouseToEdit } from '../../store/course/course.selector';
import { showErrorToast, showSuccessToast } from '../../utils/toast.util';
import { CourseUpdate } from '../../common/types/courseUpdate';

@Component({
    selector: 'app-course-add-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './addCourse.component.html',
    styleUrls: ['./addCourse.component.css']
})
export class CourseAddFormComponent implements OnInit {
    courseForm!: FormGroup;
    isSubmitting = false;
    editItem: any = null;

    private fb: FormBuilder = inject(FormBuilder);
    private store: Store = inject(Store);
    private router: Router = inject(Router);

    ngOnInit(): void {
        this.initializeForm();

        this.store.select(selectCouseToEdit).subscribe(course => {
            this.editItem = course;
            if (course) {
                this.courseForm.patchValue(course);
            }
        });
    }

    startDateNotInPast(control: AbstractControl): ValidationErrors | null {
        if (!control.value) {
            return null;
        }
        const selectedDate = new Date(control.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return { pastDate: true };
        }
        return null;
    }

    initializeForm(): void {
        this.courseForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            durationInMonths: [0, [
                Validators.required,
                Validators.min(1),
                Validators.max(60)
            ]],
            startDate: ['', [
                Validators.required,
                this.startDateNotInPast
            ]],
            minimumRequiredAge: [5, [
                Validators.required,
                Validators.min(5),
                Validators.max(100)
            ]]
        });

        if (this.editItem) {
            this.populateFormForEdit();
        }
    }

    populateFormForEdit(): void {
        this.courseForm.patchValue({
            name: this.editItem.name,
            durationInMonths: this.editItem.durationInMonths,
            startDate: this.editItem.startDate,
            minimumRequiredAge: this.editItem.minimumRequiredAge
        });
    }

    get name() {
        return this.courseForm.get('name');
    }

    get durationInMonths() {
        return this.courseForm.get('durationInMonths');
    }

    get startDate() {
        return this.courseForm.get('startDate');
    }

    get minimumRequiredAge() {
        return this.courseForm.get('minimumRequiredAge');
    }

    onSubmit(): void {
        if (this.courseForm.invalid) {
            Object.keys(this.courseForm.controls).forEach(key => {
                this.courseForm.get(key)?.markAsTouched();
            });
            return;
        }

        this.isSubmitting = true;

        const formData = this.courseForm.value;

        // edit
        if (this.editItem) {
            const updateData: CourseUpdate = {
                id: this.editItem.id,
                name: formData.name,
                durationInMonths: formData.durationInMonths,
                startDate: formData.startDate,
                minimumRequiredAge: formData.minimumRequiredAge
            };
            console.log('Update Course:', updateData);
        } else {
            const courseData: CourseAdd = {
                name: formData.name,
                durationInMonths: formData.durationInMonths,
                startDate: formData.startDate,
                minimumRequiredAge: formData.minimumRequiredAge
            };

            this.store.dispatch(addCourse({ course: courseData }));


            this.store.select(selectAddCourseSuccess).subscribe((sucess) => {
                if (sucess) {
                    showSuccessToast("Course Added Sucessfully");

                    this.courseForm.reset({
                        name: '',
                        durationInMonths: 0,
                        startDate: '',
                        minimumRequiredAge: 5
                    });

                    this.isSubmitting = false;

                    this.router.navigate(["/courselistadmin"]);
                }
            });

            this.store.select(selectAddCourseFailed).subscribe((error) => {
                if (error) {
                    showErrorToast(error);

                    this.isSubmitting = false;
                }
            })
        }
    }

    onCancel(): void {
        this.courseForm.reset({
            name: '',
            durationInMonths: 0,
            startDate: '',
            minimumRequiredAge: 5
        });
    }
}