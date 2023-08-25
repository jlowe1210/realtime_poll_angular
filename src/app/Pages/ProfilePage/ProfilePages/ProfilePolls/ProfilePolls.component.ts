import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  concat,
  concatMap,
  filter,
  from,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  take,
} from 'rxjs';
import { PollFilterComponent } from 'src/app/Components/Profile-PollFilter/PollFilter.component';
import Poll from 'src/app/Models/Poll.Model';
import Profile from 'src/app/Models/Profile.model';
import { AuthService } from 'src/app/Services/Auth.service';

@Component({
  selector: 'ProfilePolls',
  templateUrl: './ProfilePolls.component.html',
  styleUrls: ['./ProfilePolls.component.css'],
})
export class ProfilePollsComponent implements AfterViewInit {
  public profile$ = this.authService.getUserProfile();
  public filterPollList!: Observable<Poll[] | undefined>;
  @ViewChild(PollFilterComponent, { static: false })
  myFilterComponent!: PollFilterComponent;

  constructor(public authService: AuthService, private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const profilePolls$ = this.authService.getUserProfile().pipe(
      map((profile) => {
        return profile?.Polls;
      }),
      take(1)
    );

    const filteredPolls$ = this.myFilterComponent.sendFilterChange
      .asObservable()
      .pipe(
        switchMap((filter) => {
          if (!filter) {
            return profilePolls$;
          }
          return profilePolls$.pipe(
            map((poll) => {
              return poll?.filter((poll) => {
                return poll.name.indexOf(filter) !== -1;
              });
            })
          );
        })
      );

    this.filterPollList = concat(profilePolls$, filteredPolls$);
    this.cd.detectChanges();
  }
}
