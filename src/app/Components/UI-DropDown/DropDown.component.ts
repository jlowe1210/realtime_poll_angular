import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth.service';

@Component({
  selector: 'DropDown',
  templateUrl: './DropDown.component.html',
  styleUrls: ['./DropDown.component.css'],
})
export class DropDownComponent {
  constructor(public authService: AuthService, public router: Router) {}
}
