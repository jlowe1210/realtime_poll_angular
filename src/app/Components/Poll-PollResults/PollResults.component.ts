import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import Poll from 'src/app/Models/Poll.Model';

@Component({
  selector: 'PollResults',
  templateUrl: 'PollResults.component.html',
  styleUrls: ['./PollResults.component.css'],
})
export class PollResultsComponent implements OnInit {
  @Input() poll!: Poll;
  public pollResults!: Observable<any[]>;

  ngOnInit(): void {
    this.pollResults = of(this.poll).pipe(
      map((poll) => {
        return this.calcPollResults(poll.Polloptions, poll.Poll_votes);
      })
    );
  }

  private calcPollResults(options: any, votes: any) {
    const pollOptions = options.reduce(
      (pre: any, cur: any, inx: any, arr: any) => {
        if (!pre.hasOwnProperty(arr[inx].option)) {
          pre[arr[inx].option] = 0;
        }
        return pre;
      },
      {}
    );

    const pollVotes = votes.reduce((pre: any, cur: any, inx: any, arr: any) => {
      if (!pre.hasOwnProperty(arr[inx].Polloption.voted)) {
        pre[arr[inx].Polloption.voted] = 1;
      } else {
        pre[arr[inx].Polloption.voted]++;
      }

      return pre;
    }, {});

    const PollResults = { ...pollOptions, ...pollVotes };
    return Object.entries(PollResults);
  }
}
