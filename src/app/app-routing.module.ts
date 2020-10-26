import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { CategorySelectionComponent } from './features/category-selection/category-selection.component';
import { MoodBarComponent } from './features/statistics/mood/mood-bar/mood-bar.component';
import { StatisticDetailComponent } from './features/statistics/statistic-detail/statistic-detail.component';
import { MoodPieComponent } from './features/statistics/mood/mood-pie/mood-pie.component';
import { AppUsagePieComponent } from './features/statistics/app-usage/app-usage-pie/app-usage-pie.component';
import { AppUsageBarComponent } from './features/statistics/app-usage/app-usage-bar/app-usage-bar.component';
import { SleepPieComponent } from './features/statistics/sleep/sleep-pie/sleep-pie.component';
import { StressPieComponent } from './features/statistics/stress/stress-pie/stress-pie.component';
import { WordsPieComponent } from './features/statistics/words/words-pie/words-pie.component';
import { CommunicationBarComponent } from './features/statistics/communication/communication-bar/communication-bar.component';
import { CommunicationPieComponent } from './features/statistics/communication/communication-pie/communication-pie.component';
import { SleepBarComponent } from './features/statistics/sleep/sleep-bar/sleep-bar.component';
import { WordsBarComponent } from './features/statistics/words/words-bar/words-bar.component';
import { StressBarComponent } from './features/statistics/stress/stress-bar/stress-bar.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'select', component: CategorySelectionComponent, children: [
      {
        path: 'mood', component: StatisticDetailComponent, children: [
          { path: '1', component: MoodPieComponent },
          { path: '2', component: MoodBarComponent },
        ]
      },
      {
        path: 'app', component: StatisticDetailComponent, children: [
          { path: '1', component: AppUsagePieComponent },
          { path: '2', component: AppUsageBarComponent },
        ]
      },
      {
        path: 'sleep', component: StatisticDetailComponent, children: [
          { path: '1', component: SleepPieComponent },
          { path: '2', component: SleepBarComponent },
        ]
      },
      {
        path: 'words', component: StatisticDetailComponent, children: [
          { path: '1', component: WordsPieComponent },
          { path: '2', component: WordsBarComponent },
        ]
      },
      {
        path: 'communication', component: StatisticDetailComponent, children: [
          { path: '1', component: CommunicationPieComponent },
          { path: '2', component: CommunicationBarComponent },
        ]
      },
      {
        path: 'stress', component: StatisticDetailComponent, children: [
          { path: '1', component: StressPieComponent },
          { path: '2', component: StressBarComponent },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
