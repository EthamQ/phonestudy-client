import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorySelectionComponent } from './core/category-selection/category-selection.component';
import { AuthentificationGuard } from '@core/guards/authentification.guard';
import { IsUserKnownGuard } from '@core/guards/is-user-known.guard';
import { AuthenticationComponent } from '@core/authentication/authentication.component';
import { ErrorComponent } from '@core/components/error/error.component';

const routes: Routes = [

  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: 'authenticate/:userId', component: AuthenticationComponent, canActivate: [AuthentificationGuard] },
  { path: 'start', component: CategorySelectionComponent, canActivate: [IsUserKnownGuard] },
  { 
    path: 'statistics',
    loadChildren:  () => import('./features/statistics/statistics.module').then(m => m.StatisticsModule),
    canActivate: [IsUserKnownGuard],
  },

  {path: 'oops', component: ErrorComponent},
  {path: '**', redirectTo: '/oops'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
