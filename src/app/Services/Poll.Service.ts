import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, retry, tap, throwError } from 'rxjs';
import { AuthService } from './Auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true,
};

@Injectable({ providedIn: 'root' })
export class PollService {
  constructor(
    private readonly Http: HttpClient,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public getPoll(id: string | null) {
    return this.Http.get(`/api/poll/${id}`, {
      withCredentials: true,
    });
  }

  public pollVote(pollId: string, optionId: number) {
    if (pollId && optionId) {
      const voteBody = { pollId, optionId };
      return this.Http.post(`/api/poll/vote`, voteBody, {
        withCredentials: true,
      });
    }
    return;
  }

  public createPoll(pollBody: any) {
    return this.Http.post('/api/poll/create', pollBody, {
      withCredentials: true,
    }).pipe(
      tap((createdPoll: any) => {
        let { poll } = createdPoll;
        poll = { ...poll, Poll_votes: [] };
        let Polls = this.authService.getUserProfileValue()?.Polls;

        const currentProfile = this.authService.getUserProfileValue();

        const updatedUserProfile = {
          id: currentProfile?.id,
          username: currentProfile?.username,
          email: currentProfile?.email,
          Polls: [...(<[]>Polls), poll],
        };

        this.authService.updateUserProfile(updatedUserProfile);
      }),
      catchError((err) => {
        if (err.status === 401) {
          this.authService.logout();
          this.router.navigateByUrl('/login');
        }
        if (err.status === 400) {
          return throwError(() => new Error(err.error.errors.message));
        }
        return throwError(() => new Error('Unable to create poll'));
      })
    );
  }
}
