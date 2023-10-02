import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/UI-NavBar/NavBar.component';
import { ShareModule } from './Share.module';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './Pages/HomePage/HomePage.component';
import { DropDownComponent } from './Components/UI-DropDown/DropDown.component';
import { AuthGaurdService } from './Services/AuthGuard.service';
import { io } from 'socket.io-client';

export const socket = io('/', {
  withCredentials: true,
  reconnection: true,
});

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('./Pages/LoginPage/LoginPage.module').then(
        (x) => x.LoginPageModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./Pages/SignupPage/SignupPage.module').then(
        (x) => x.SignupPageModule
      ),
  },
  {
    path: 'poll/:id',
    loadChildren: () =>
      import('./Pages/PollPage/PollPage.module').then((x) => x.PollPageModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./Pages/ProfilePage/ProfilePage.module').then(
        (x) => x.ProfilePageModule
      ),
    canLoad: [AuthGaurdService],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    DropDownComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), ShareModule],
  providers: [AuthGaurdService],
  bootstrap: [AppComponent],
})
export class AppModule {}
