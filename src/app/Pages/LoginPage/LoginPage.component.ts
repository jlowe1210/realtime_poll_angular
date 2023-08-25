import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, ReplaySubject, takeUntil } from 'rxjs';
import User from 'src/app/Models/User.model';
import { AuthService } from 'src/app/Services/Auth.service';

@Component({
  selector: 'LoginPage',
  templateUrl: './LoginPage.component.html',
  styleUrls: ['./LoginPage.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public loadingReponse: boolean = false;
  public errorMessage: string = '';
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private readonly http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((_) => {
        if (this.errorMessage) {
          this.errorMessage = '';
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  loginSubmit() {
    this.loadingReponse = true;
    this.http
      .post('/api/auth/login', this.loginForm.value, { withCredentials: true })
      .pipe(
        catchError((err) => {
          if (err.status === 400) {
            this.errorMessage = err.error.errors.message;
            this.loginForm.reset('', { emitEvent: false });
          }
          this.loadingReponse = false;
          return of('');
        })
      )
      .subscribe((reponse) => {
        this.loadingReponse = false;
        if (reponse) {
          this.authService.setCreditial(<User>reponse);
          this.router.navigateByUrl('/profile');
        }
      });
  }
}
