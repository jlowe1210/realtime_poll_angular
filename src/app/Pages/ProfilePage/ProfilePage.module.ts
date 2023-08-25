import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProfileNavBarComponent } from 'src/app/Components/Profile-NavBar/ProfileNavBar.component';
import { PollCreateForm } from 'src/app/Components/Profile-PollCreateForm/PollCreateForm.component';
import { PollFilterComponent } from 'src/app/Components/Profile-PollFilter/PollFilter.component';
import { PollListComponent } from 'src/app/Components/Profile-PollList/PollList.component';
import { AuthGaurdService } from 'src/app/Services/AuthGuard.service';
import { ShareModule } from 'src/app/Share.module';
import { ProfilePageComponent } from './ProfilePage.component';
import { ProfilePollCreateComponent } from './ProfilePages/ProfilePollCreate/ProfilePollCreate.component';
import { ProfilePollsComponent } from './ProfilePages/ProfilePolls/ProfilePolls.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    canActivate: [AuthGaurdService],
    children: [
      { path: 'polls', component: ProfilePollsComponent },
      { path: 'create', component: ProfilePollCreateComponent },
      { path: '', redirectTo: 'polls', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    ProfilePollsComponent,
    ProfilePageComponent,
    ProfileNavBarComponent,
    ProfilePollCreateComponent,
    PollCreateForm,
    PollListComponent,
    PollFilterComponent,
  ],
  imports: [RouterModule.forChild(routes), ShareModule, FormsModule],
  providers: [AuthGaurdService],
  exports: [],
})
export class ProfilePageModule {}
