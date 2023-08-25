import { Injectable } from '@angular/core';
import {
  CanLoad,
  CanActivate,
  Route,
  Router,
  UrlSegment,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './Auth.service';

@Injectable()
export class AuthGaurdService implements CanLoad, CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean> {
    return this.authService.getUserAsObservale().pipe(
      map((user) => {
        if (!user) {
          this.router.navigateByUrl('/login');
          return false;
        }

        return !!user;
      })
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | UrlTree | Observable<boolean> {
    return this.authService.getUserAsObservale().pipe(
      map((user) => {
        if (!user) {
          this.router.navigateByUrl('/login');
          return false;
        }

        return !!user;
      })
    );
  }
}
