import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loginStart } from '../../store/authentication/auth.actions';
import {
    selectAuthError,
    selectAccessToken,
} from '../../store/authentication/auth.selector';
import { showErrorToast  } from '../../utils/toast.util';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm!: FormGroup;
    submitted = false;

    private subscriptions = new Subscription();
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private store: Store = inject(Store);

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(200),
                    Validators.pattern(
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
                    ),
                ],
            ],
        });

        const errorSub = this.store.select(selectAuthError).subscribe((err) => {
            if (err) {
                showErrorToast(err);
            }
        });

        const tokenSub = this.store.select(selectAccessToken).subscribe((token) => {
            if (token) {
                this.router.navigate(['/hrcandidatpending']);
            }
        });

        this.subscriptions.add(errorSub);
        this.subscriptions.add(tokenSub);
    }

    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) return;

        const { email, password } = this.loginForm.value;
        this.store.dispatch(loginStart({ email, password }));
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}