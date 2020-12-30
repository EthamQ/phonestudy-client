import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorySelectionComponent } from '@core/components/category-selection/category-selection.component';
import { AuthentificationGuard } from '@core/guards/authentification.guard';
import { IsUserKnownGuard } from '@core/guards/is-user-known.guard';
import { AuthenticationComponent } from '@core/components/authentication/authentication.component';
import { ErrorComponent } from '@core/components/error/error.component';
import { FirstOutletComponent } from './features/first-outlet/first-outlet.component';

const children: Routes = [
  { 
    path: '',
    component: CategorySelectionComponent,
  },
  { path: 'authenticate/:userId', component: AuthenticationComponent, canActivate: [AuthentificationGuard] },
  { 
    path: 'detail',
    canActivate: [IsUserKnownGuard],
    loadChildren:  () => import('./features/detail-view/detail-view.module').then(m => m.DetailViewModule),
  },
];

const routes: Routes = [
  { 
    path: 'startV1TgpPR',
    component: FirstOutletComponent,
    data: {
      compareWith: 'none',
    },
    children,
  },
  { 
    path: 'startV2zSS0H',
    component: FirstOutletComponent,
    data: {
      compareWith: 'all',
    },
    children,
  },
  { 
    path: 'startV3d3evD',
    component: FirstOutletComponent,
    data: {
      compareWith: 'demographic',
    },
    children,
  },
  { path: 'oops', component: ErrorComponent },
  { path: '**', redirectTo: '/oops' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
