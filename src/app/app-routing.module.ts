import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorySelectionComponent } from '@core/components/category-selection/category-selection.component';
import { AuthentificationGuard } from '@core/guards/authentification.guard';
import { IsUserKnownGuard } from '@core/guards/is-user-known.guard';
import { AuthenticationComponent } from '@core/components/authentication/authentication.component';
import { ErrorComponent } from '@core/components/error/error.component';

const routes: Routes = [

  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: 'authenticate/:userId', component: AuthenticationComponent, canActivate: [AuthentificationGuard] },
  { path: 'start', component: CategorySelectionComponent, canActivate: [IsUserKnownGuard] },
  { 
    path: 'detail',
    canActivate: [IsUserKnownGuard],
    loadChildren:  () => import('./features/detail-view/detail-view.module').then(m => m.DetailViewModule),
  },
  { path: 'oops', component: ErrorComponent },
  { path: '**', redirectTo: '/oops' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
