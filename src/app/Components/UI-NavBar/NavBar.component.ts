import { Component, Host, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import User from 'src/app/Models/User.model';
import { AuthService } from 'src/app/Services/Auth.service';

@Component({
  selector: 'NavBar',
  templateUrl: './NavBar.component.html',
  styleUrls: ['./NavBar.component.css'],
})
export class NavBarComponent implements OnInit {
  public showDropDown: boolean = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(ev: Event) {
    const target = ev.target as HTMLElement;
    const isTargeted = target.tagName === 'P' && target.id === 'dropdown';

    if (!isTargeted) {
      this.showDropDown = false;
    }
  }
  public user$!: Observable<User | null>;

  constructor(
    public router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.getUserAsObservale();
  }
}
