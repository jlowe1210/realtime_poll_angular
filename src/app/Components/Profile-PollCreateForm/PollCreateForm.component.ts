import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ReplaySubject, takeUntil } from 'rxjs';

import { PollService } from 'src/app/Services/Poll.Service';

function isEmpty(): ValidatorFn {
  return function (control: AbstractControl<string>) {
    if (!control.value) {
      return null;
    }

    const isFieldEmpty = control.value.trim() === '';

    return isFieldEmpty ? { emptyField: true } : null;
  };
}

@Component({
  selector: 'Pollcreate',
  templateUrl: './PollCreateForm.component.html',
  styleUrls: ['./PollCreateForm.component.css'],
})
export class PollCreateForm implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public error: string | null = null;
  public loading: boolean = false;
  public response: any | null = null;

  public pollCreateForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, isEmpty()]],
    duration_time: [1, Validators.required],
    duration_option: ['minutes', Validators.required],
    options: this.fb.array([this.createOption(), this.createOption()]),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly pollService: PollService
  ) {}

  ngOnInit(): void {
    this.pollCreateForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((_) => {
        this.error = null;
      });
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  get formOptions() {
    return this.pollCreateForm.controls['options'] as FormArray;
  }
  get name() {
    return this.pollCreateForm.get('name')?.value;
  }

  get durationTime() {
    return this.pollCreateForm.get('duration_time')?.value;
  }

  get durationOption() {
    return this.pollCreateForm.get('duration_option')?.value;
  }

  public createOption() {
    return this.fb.group({
      option: ['', [Validators.required, isEmpty()]],
    });
  }

  public addOption() {
    this.formOptions.push(this.createOption());
  }

  public removeOption(index: number) {
    this.formOptions.removeAt(index);
  }
  public handleSubmit() {
    this.loading = true;
    this.error = null;
    if (this.pollCreateForm.valid) {
      const pollBody = {
        name: this.name.trim(),
        duration: `${this.durationTime} ${this.durationOption}`,
        options: this.formOptions.value.map((pollOption: any) => {
          return { option: pollOption.option.trim() };
        }),
      };

      this.pollService
        .createPoll(pollBody)

        .subscribe({
          next: (response) => {
            this.response = response;
            this.loading = false;
          },
          error: (e) => {
            this.error = e.message;
            this.loading = false;
          },
          complete: () => console.info('complete'),
        });

      while (this.formOptions.length > 2) {
        this.formOptions.removeAt(0);
      }
      this.pollCreateForm.reset(
        {
          duration_time: 1,
          duration_option: 'minutes',
        },
        { emitEvent: false }
      );
    }
  }

  public optionInputPlaceholder(index: number) {
    return `option ${index + 1}`;
  }
}
