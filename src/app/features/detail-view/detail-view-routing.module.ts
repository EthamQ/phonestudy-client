import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailViewOutletComponent } from './components/detail-view-outlet/detail-view-outlet.component';
const routes: Routes = [
  { 
    path: '',
    component: DetailViewOutletComponent,
    children: [
      { 
        path: 'statistics',
        loadChildren:  () => import('../statistics/statistics.module').then(m => m.StatisticsModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailViewRoutingModule { }
