import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  catchError,
  concat,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { PollService } from 'src/app/Services/Poll.Service';
import { SocketService } from 'src/app/Services/Socket.Service';

@Component({
  selector: 'PollPage',
  templateUrl: './PollPage.component.html',
  styleUrls: ['./PollPage.component.css'],
})
export class PollPageComponent implements OnInit, OnDestroy {
  private pollId!: string | null;
  public isLoadingPoll: boolean = false;
  public didPollExpire: boolean = false;

  private _poll!: Observable<any>;

  public pollError!: any;

  public get poll() {
    return this._poll;
  }

  private set poll(value) {
    this._poll = value;
  }

  constructor(
    private readonly activedRoute: ActivatedRoute,
    private readonly http: HttpClient,
    private readonly socketService: SocketService,
    private readonly pollService: PollService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoadingPoll = true;

    const getActiveRouteId = this.activedRoute.paramMap.pipe(
      tap((params) => {
        if (params.get('id') && !this.pollId) {
          this.pollId = params.get('id');
        }
      }),
      map((params) => {
        return params.get('id');
      })
    );

    this.poll = concat(
      getActiveRouteId.pipe(
        switchMap((id) => {
          return this.pollService.getPoll(id);
        }),
        take(1)
      ),
      getActiveRouteId.pipe(
        switchMap((id) => {
          return this.socketService.updatedPollAsObservable(id);
        })
      )
    ).pipe(
      catchError((err) => {
        this.isLoadingPoll = false;
        this.pollError = err.error.errors.message;

        return of('');
      }),
      tap((_) => {
        this.isLoadingPoll = false;
      })
    );
  }

  handleDidPollExpire(pollExpired: boolean) {
    this.didPollExpire = pollExpired;
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.socketService.leaveRoomAndUnSub(this.pollId);
  }
}
