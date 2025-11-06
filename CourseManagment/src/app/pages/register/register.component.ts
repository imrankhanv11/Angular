import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { registerStart } from '../../store/authentication/auth.actions';
import { selectRegisterFaild, selectRegisterSuccess } from '../../store/authentication/auth.selector';
import { showErrorToast, showSuccessToast } from '../../utils/toast.util';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm!: FormGroup;
    submitted = false;

    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private store: Store = inject(Store);

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(200),
                    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)
                ]
            ],
        });
    }

    get f() {
        return this.registerForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        console.log('Registration Successful', this.registerForm.value);

        const { name, email, password } = this.registerForm.value;

        console.log(name, email, password);

        this.store.dispatch(registerStart({ name, email, password }));

        this.store.select(selectRegisterSuccess).subscribe((success) => {
            if (success) {
                this.registerForm.reset({
                    name: '', email: '', password: ''
                });

                this.submitted = false;
                showSuccessToast("Register Sucessfully");
                this.router.navigate(['/login']);
            }
        });

        this.store.select(selectRegisterFaild).subscribe((error) => {
            if (error) {
                this.submitted = false;
                showErrorToast(error);
            }
        })
    }

    onLogin(): void {
        this.router.navigate(['/login']);
    }
}
