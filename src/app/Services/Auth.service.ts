import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, shareReplay, tap } from 'rxjs';
import Profile from '../Models/Profile.model';
import User from '../Models/User.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userInfo: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(
      localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') || '{}')
        : null
    );

  private userProfile: BehaviorSubject<Profile | null> =
    new BehaviorSubject<Profile | null>(null);

  constructor(private readonly http: HttpClient) {}

  public setCreditial(payload: User) {
    this.userInfo.next(payload);
    localStorage.setItem('user', JSON.stringify(payload));
  }

  public logout() {
    this.userInfo.next(null);
    this.userProfile.next(null);
    localStorage.removeItem('user');
    this.http
      .post('/api/auth/logout', {}, { withCredentials: true })
      .subscribe();
  }

  public getUserAsObservale() {
    return this.userInfo.asObservable();
  }

  public getUserProfileValue() {
    return this.userProfile.value;
  }

  public updateUserProfile(profile: Profile) {
    this.userProfile.next(profile);
  }

  public getUserProfile() {
    if (this.userProfile.value) {
      return this.userProfile.asObservable();
    }

    return this.http
      .get<Profile>('/api/auth/profile', { withCredentials: true })
      .pipe(
        tap((profile) => {
          this.userProfile.next(profile);
        }),
        shareReplay(1)
      );
  }
}
