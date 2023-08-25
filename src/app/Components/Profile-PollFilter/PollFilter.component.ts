import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'PollFilter',
  templateUrl: './PollFilter.component.html',
  styleUrls: ['./PollFilter.component.css'],
})
export class PollFilterComponent {
  public filter: string = '';

  @Output() sendFilterChange = new EventEmitter<string>();

  public filterChange(e: string) {
    this.filter = e;
    this.sendFilterChange.next(this.filter);
  }
}
