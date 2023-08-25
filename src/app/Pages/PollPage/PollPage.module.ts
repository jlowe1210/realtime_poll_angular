import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from 'src/app/Components/Poll-Chart/Chart.component';
import { CountDownComponent } from 'src/app/Components/Poll-CountDown/CountDown.component';
import { PollResultsComponent } from 'src/app/Components/Poll-PollResults/PollResults.component';
import { PollVoteFormComponent } from 'src/app/Components/Poll-PollVoteForm/PollVoteForm.component';
import { TitleAndAuthorComponent } from 'src/app/Components/Poll-TitleAndAuthor/TitleAndAuthor.component';
import { ShareModule } from 'src/app/Share.module';
import { PollPageComponent } from './PollPage.component';

const routes: Routes = [{ path: '', component: PollPageComponent }];

@NgModule({
  declarations: [
    PollPageComponent,
    CountDownComponent,
    PollVoteFormComponent,
    ChartComponent,
    TitleAndAuthorComponent,
    PollResultsComponent,
  ],
  providers: [],
  imports: [RouterModule.forChild(routes), ShareModule, FormsModule],
})
export class PollPageModule {}
