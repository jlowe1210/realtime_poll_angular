import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export function passwordMatched(): ValidatorFn {
  return function (control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value === confirmPassword?.value
      ? null
      : { notmatched: true };
  };
}

@Component({
  selector: 'SignupPage',
  templateUrl: './SignupPage.component.html',
  styleUrls: ['./SignupPage.component.css'],
})
export class SignupPageComponent {
  public loadingReponse: boolean = false;
  public signupForm: FormGroup = this.fb.group(
    {
      username: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatched() }
  );

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  public handlesubmit() {
    this.loadingReponse = true;
    if (this.signupForm.valid) {
      this.http
        .post('/api/auth/signup', this.signupForm.value, {
          withCredentials: true,
        })
        .pipe(
          catchError((err) => {
            const ServerErrors = err.error.errors;
            this.loadingReponse = false;
            for (let field in ServerErrors) {
              this.signupForm
                .get(field)
                ?.setErrors({ server: ServerErrors[field] });
            }

            return throwError(() => new Error('err'));
          })
        )
        .subscribe({
          next: () => {
            this.loadingReponse = false;
            this.router.navigateByUrl('/login?usercreated=true');
          },
          error: (err) => {},
        });
    }
  }

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
}
