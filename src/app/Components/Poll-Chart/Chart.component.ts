import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as Chart from 'chart.js';

import Poll from 'src/app/Models/Poll.Model';
import Polloption from 'src/app/Models/Polloption.model';

@Component({
  selector: 'Poll-Chart',
  templateUrl: './Chart.component.html',
  styleUrls: ['./Chart.component.css'],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() poll!: Poll;
  public randomPollColors!: string[];
  public pieChart: any;

  ngOnInit(): void {
    const PollData = this.getPollChartData(this.poll);

    this.randomPollColors = this.generateRandomColor(this.poll);

    let data;
    if (this.doesPollHaveVotes(this.poll)) {
      data = {
        labels: Object.keys(PollData),
        datasets: [
          {
            data: Object.values(PollData),
            backgroundColor: this.randomPollColors,
            borderWidth: 1,
          },
        ],
      };
    } else {
      data = {
        labels: ['No votes yet'],
        datasets: [
          {
            label: 'No data',
            backgroundColor: ['#D3D3D3'],
            data: [1],
          },
        ],
      };
    }

    this.pieChart = new Chart('pie-chart', {
      type: 'pie',
      data: data,
      options: { maintainAspectRatio: false },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['poll'].firstChange) {
      console.log(changes['poll']);
      const PollData = this.getPollChartData(changes['poll'].currentValue);

      const data = {
        labels: Object.keys(PollData),
        datasets: [
          {
            data: Object.values(PollData),
            backgroundColor: this.randomPollColors,
            borderWidth: 1,
          },
        ],
      };
      this.pieChart.data = data;
      this.pieChart.update();
    }
  }

  private generateRandomColor(poll: Poll) {
    const randomColor = poll.Polloptions.map((lable) => {
      return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)} )`;
    });

    return randomColor;
  }

  private getPollChartData(poll: Poll) {
    const options = poll.Polloptions.reduce(
      (
        pre: { [key: string]: number },
        cur: Polloption,
        inx: number,
        array: Polloption[]
      ) => {
        if (!pre.hasOwnProperty(cur.option!)) {
          if (cur.option) {
            pre[cur.option] = 0;
          }
        }
        return pre;
      },
      {}
    );

    const votes = poll.Poll_votes.reduce(
      (pre: { [key: string]: number }, cur: any, inx: number, arr: any) => {
        if (!pre.hasOwnProperty(arr[inx].Polloption.voted)) {
          pre[arr[inx].Polloption.voted] = 1;
        } else {
          pre[arr[inx].Polloption.voted]++;
        }

        return pre;
      },
      {}
    );

    const pollData = { ...options, ...votes };
    return pollData;
  }

  private doesPollHaveVotes(poll: Poll) {
    return poll.Poll_votes.length >= 1;
  }
}
