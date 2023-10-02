import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Polloption from 'src/app/Models/Polloption.model';
import { PollService } from 'src/app/Services/Poll.Service';

@Component({
  selector: 'PollVoteForm',
  templateUrl: './PollVoteForm.component.html',
  styleUrls: ['./PollVoteForm.component.css'],
})
export class PollVoteFormComponent implements OnInit {
  @Input() pollId!: string;
  @Input() pollOptions!: Polloption[];
  public selectedOption: string = '';
  public sameSelectedOption!: string;

  public loading: boolean = false;

  constructor(private readonly pollService: PollService) {}

  ngOnInit(): void {}

  public handleVote(form: NgForm) {
    this.sameSelectedOption = this.selectedOption;
    this.loading = true;
    this.pollService
      .pollVote(this.pollId, form.value.option)
      ?.subscribe((response) => {
        this.loading = false;
      });
  }
}
