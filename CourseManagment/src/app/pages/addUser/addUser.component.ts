import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addUser, clearSelectedUser, updateUser } from '../../store/user/user.action';
import { CommonModule } from '@angular/common';
import { selectAddUserError, selectAddUserSuccess, selectUpdateUserError, selectUpdateUserSuccess, selectUsers } from '../../store/user/user.selector';
import { showSuccessToast, showErrorToast } from '../../utils/toast.util';
import { Router } from '@angular/router';
import { UserUpdateDate } from '../../common/types/userUpdateDTO';
import { UserAddDto } from '../../common/types/userAddDTO';


@Component({
    selector: 'app-user-add-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './addUser.component.html',
    styleUrls: ['./addUser.component.css']
})
export class UserAddFormComponent implements OnInit {
    userForm!: FormGroup;
    isSubmitting = false;
    editUser: UserUpdateDate | null = null;

    private fb: FormBuilder = inject(FormBuilder);
    private store: Store = inject(Store);
    private router: Router = inject(Router);

    ngOnInit(): void {
        this.initializeForm();

        this.store.select(selectUsers).subscribe(user => {
            this.editUser = user;
            if (user) {
                this.userForm.patchValue(user);
            }
        });
    }

    dateNotInFuture(control: AbstractControl): ValidationErrors | null {
        if (!control.value) {
            return null;
        }
        const selectedDate = new Date(control.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            return { futureDate: true };
        }
        return null;
    }

    initializeForm(): void {
        this.userForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            dateOfBirth: ['', [
                Validators.required,
                this.dateNotInFuture,
            ]],
            phoneNumber: ['', [
                Validators.required,
                Validators.pattern(/^[0-9]{10}$/)
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(200),
                Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
            ]],
            isActive: [true, [Validators.required]],
            isAdmin: ['', [Validators.required]]
        });

        if (this.editUser) {
            this.populateFormForEdit();
        }
    }

    populateFormForEdit(): void {
        if (!this.editUser) {
            return;
        }
        else {
            this.userForm.patchValue({
                name: this.editUser.name,
                email: this.editUser.email,
                dateOfBirth: this.editUser.dateOfBirth,
                phoneNumber: this.editUser.phoneNumber,
                isAdmin: this.editUser.isAdmin ? 'Admin' : 'User'
            });
        }
    }

    get name() {
        return this.userForm.get('name');
    }

    get email() {
        return this.userForm.get('email');
    }

    get dateOfBirth() {
        return this.userForm.get('dateOfBirth');
    }

    get phoneNumber() {
        return this.userForm.get('phoneNumber');
    }

    get password() {
        return this.userForm.get('password');
    }

    get isActive() {
        return this.userForm.get('isActive');
    }

    get isAdmin() {
        return this.userForm.get('isAdmin');
    }

    onSubmit(): void {
        if (this.userForm.invalid) {
            Object.keys(this.userForm.controls).forEach(key => {
                this.userForm.get(key)?.markAsTouched();
            });
            return;
        }

        this.isSubmitting = true;

        const formData = this.userForm.value;
        const userData: UserAddDto = {
            ...formData,
            isAdmin: formData.isAdmin === 'Admin'
        };

        if (this.editUser) {
            const data: UserUpdateDate = {
                id: this.editUser.id,
                name: userData.name,
                email: userData.email,
                password: userData.password,
                isActive: userData.isActive,
                isAdmin: userData.isAdmin,
                phoneNumber: userData.phoneNumber,
                dateOfBirth: userData.dateOfBirth,
            }

            this.store.dispatch(updateUser({ user: data }));

            this.store.select(selectUpdateUserSuccess).subscribe(success => {
                if (success) {
                    this.userForm.reset({
                        name: '',
                        email: '',
                        dateOfBirth: '',
                        phoneNumber: '',
                        password: '',
                        isActive: true,
                        isAdmin: ''
                    });
                    this.isSubmitting = false;
                    showSuccessToast('User Update successfully!');
                    this.store.dispatch(clearSelectedUser());
                    this.router.navigate(['/userlist']);
                }
            });

            this.store.select(selectUpdateUserError).subscribe(error => {
                if (error) {
                    this.isSubmitting = false;
                    showErrorToast(error);
                }
            });
        } else {
            this.store.dispatch(addUser({ user: userData }));

            this.store.select(selectAddUserSuccess).subscribe(success => {
                if (success) {
                    this.userForm.reset({
                        name: '',
                        email: '',
                        dateOfBirth: '',
                        phoneNumber: '',
                        password: '',
                        isActive: true,
                        isAdmin: ''
                    });
                    this.isSubmitting = false;
                    showSuccessToast('User added successfully!');
                    this.router.navigate(['/userlist']);

                }
            });

            this.store.select(selectAddUserError).subscribe(error => {
                if (error) {
                    this.isSubmitting = false;
                    showErrorToast(error);
                }
            });
        }
    }

    onCancel(): void {
        this.userForm.reset({
            name: '',
            email: '',
            dateOfBirth: '',
            phoneNumber: '',
            password: '',
            isActive: true,
            isAdmin: ''
        });

        this.isSubmitting = false;
    }
}