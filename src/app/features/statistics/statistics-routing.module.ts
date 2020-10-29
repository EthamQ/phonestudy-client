import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StressBarComponent } from './stress/stress-bar/stress-bar.component';
import { StressPieComponent } from './stress/stress-pie/stress-pie.component';
import { StatisticDetailComponent } from './statistic-detail/statistic-detail.component';

const routes: Routes = [
  {
    path: 'stress', component: StatisticDetailComponent, children: [
      { path: '1', component: StressPieComponent },
      { path: '2', component: StressBarComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
