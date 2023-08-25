import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'Count-down',
  templateUrl: './CountDown.component.html',
  styleUrls: ['./CountDown.component.css'],
})
export class CountDownComponent implements OnInit {
  @Input() tillExpire: any;
  @Output() setPollExpire: EventEmitter<boolean> = new EventEmitter<boolean>();

  public secondsLeft$!: Observable<number>;

  public _secondsLeft: number = Infinity;

  public get secondsLeft() {
    return this._secondsLeft;
  }

  public set secondsLeft(value) {
    if (value <= 0) {
      this.setPollExpire.emit(true);

      this.didPollExpire = true;
      clearInterval(this.intervalRefernce);
    }
    this._secondsLeft = value;
  }

  public tillPollEnds!: number;
  public didPollExpire: boolean = true;
  private intervalRefernce!: number;

  ngOnInit(): void {
    this.tillPollEnds = Date.now() + this.tillExpire;
    if (this.tillExpire > 0) {
      this.didPollExpire = false;
      this.secondsLeft = this.getTimeRemaining();
      this.intervalRefernce = window.setInterval(() => {
        this.secondsLeft = this.getTimeRemaining();
      }, 1000);
    } else {
      this.setPollExpire.emit(true);
    }
  }

  public getTimeRemaining() {
    return Math.round((this.tillPollEnds - Date.now()) / 1000);
  }

  public formatTime(seconds: number | null): string | void {
    let hours;
    let minutes;
    let remainingSeconds;

    if (seconds) {
      hours = Math.floor(seconds / 3600);
      minutes = Math.floor((seconds % 3600) / 60);
      remainingSeconds = seconds % 60;
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
  }
}
