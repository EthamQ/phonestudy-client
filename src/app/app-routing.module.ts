import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorySelectionComponent } from './core/category-selection/category-selection.component';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: 'start', component: CategorySelectionComponent },
  { 
    path: 'statistics',
    loadChildren:  () => import('./features/statistics/statistics.module').then(m => m.StatisticsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
