import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth.service';

@Component({
  selector: 'ProfilePage',
  templateUrl: './ProfilePage.component.html',
  styleUrls: ['./ProfilePage.component.css'],
})
export class ProfilePageComponent implements OnInit {
  public isUserLoggedIn: any;
  public userProfile$ = this.authService.getUserProfile().pipe(
    catchError((err) => {
      if (err) {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      }
      return of(err);
    })
  );

  constructor(
    private authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.getUserAsObservale().pipe(
      map((user) => {
        return !!user;
      }),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
