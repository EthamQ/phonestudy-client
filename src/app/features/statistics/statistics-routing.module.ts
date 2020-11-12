import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StressBarComponent } from './src/components/categories/stress/stress-bar/stress-bar.component';
import { StressPieComponent } from './src/components/categories/stress/stress-pie/stress-pie.component';
import { MoodBarComponent } from './src/components/categories/mood/mood-bar/mood-bar.component';
import { MoodPieComponent } from './src/components/categories/mood/mood-pie/mood-pie.component';
import { SleepBarComponent } from './src/components/categories/sleep/sleep-bar/sleep-bar.component';
import { SleepPieComponent } from './src/components/categories/sleep/sleep-pie/sleep-pie.component';
import { StatisticRouterOutletComponent } from './src/components/statistic-router-outlet/statistic-router-outlet.component';
import { AppUsageBarComponent } from './src/components/categories/app-usage/app-usage-bar/app-usage-bar.component';
import { AppUsagePieComponent } from './src/components/categories/app-usage/app-usage-pie/app-usage-pie.component';

const routes: Routes = [
  {
    path: 'stress', component: StatisticRouterOutletComponent, children: [
      { path: '1', component: StressPieComponent },
      { path: '2', component: StressBarComponent },
    ]
  },
  {
    path: 'mood', component: StatisticRouterOutletComponent, children: [
      { path: '1', component: MoodPieComponent },
      { path: '2', component: MoodBarComponent },
    ]
  },
  {
    path: 'sleep', component: StatisticRouterOutletComponent, children: [
      { path: '1', component: SleepPieComponent },
      { path: '2', component: SleepBarComponent },
    ]
  },
  {
    path: 'app', component: StatisticRouterOutletComponent, children: [
      { path: '1', component: AppUsagePieComponent },
      { path: '2', component: AppUsageBarComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
