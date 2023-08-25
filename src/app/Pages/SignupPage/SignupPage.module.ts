import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupPageComponent } from './SignupPage.component';
import { CommonModule } from '@angular/common';
import { ShareModule } from 'src/app/Share.module';
import { LoggedInGuard } from 'src/app/Services/LoggedInGuard.service';

export const routes: Routes = [
  { path: '', component: SignupPageComponent, canActivate: [LoggedInGuard] },
];

@NgModule({
  declarations: [SignupPageComponent],
  providers: [],
  imports: [ShareModule, RouterModule.forChild(routes)],
})
export class SignupPageModule {}
