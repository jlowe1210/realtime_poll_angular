import { Component, Input } from '@angular/core';
import User from 'src/app/Models/User.model';

@Component({
  selector: 'TitleAndAuthor',
  templateUrl: './TitleAndAuthor.component.html',
  styleUrls: ['./TitleAndAuthor.component.css'],
})
export class TitleAndAuthorComponent {
  @Input() pollTitle!: string;
  @Input() pollAuthor!: User;
}
