import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';

import Poll from 'src/app/Models/Poll.Model';

@Component({
  selector: 'PollList',
  templateUrl: 'PollList.component.html',
  styleUrls: ['./PollList.component.css'],
})
export class PollListComponent implements OnInit {
  @Input() list!: Poll[] | undefined | null;

  constructor(private ref: ChangeDetectorRef) {}
  ngOnInit(): void {
    console.log(this.list);
  }

  public generateTwitterShare(url: string, pollName: string) {
    return `https://twitter.com/intent/tweet?url=${url}&text=${pollName} Poll at`;
  }
  public generateFacebookShare(url: string, pollName: string) {
    return `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${pollName} Poll at`;
  }
}
