import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './LoginPage.component';
import { ShareModule } from 'src/app/Share.module';
import { LoggedInGuard } from 'src/app/Services/LoggedInGuard.service';

export const routes: Routes = [
  { path: '', component: LoginPageComponent, canActivate: [LoggedInGuard] },
];

@NgModule({
  declarations: [LoginPageComponent],
  providers: [],
  imports: [ShareModule, RouterModule.forChild(routes)],
})
export class LoginPageModule {}
