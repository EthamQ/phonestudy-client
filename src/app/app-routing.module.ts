import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { CategorySelectionComponent } from './features/category-selection/category-selection.component';
import { ContactDetailsComponent } from './features/contact-details/contact-details.component';
import { MusicDetailsComponent } from './features/music-details/music-details.component';
import { MusicPieComponent } from './features/music-details/music-pie/music-pie.component';
import { MusicMoodLineComponent } from './features/music-details/music-mood-line/music-mood-line.component';
import { MusicMoodScatterComponent } from './features/music-details/music-mood-scatter/music-mood-scatter.component';
import { AppPieComponent } from './features/app-details/app-pie/app-pie.component';
import { AppMoodLineComponent } from './features/app-details/app-mood-line/app-mood-line.component';
import { AppMoodScatterComponent } from './features/app-details/app-mood-scatter/app-mood-scatter.component';
import { AppDetailsComponent } from './features/app-details/app-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'select', component: CategorySelectionComponent, children: [
      { path: 'contact', component: ContactDetailsComponent },
      {
        path: 'music', component: MusicDetailsComponent, children: [
          { path: '1', component: MusicPieComponent },
          { path: '2', component: MusicMoodLineComponent },
          { path: '3', component: MusicMoodScatterComponent }
        ]
      },
      {
        path: 'app', component: AppDetailsComponent, children: [
          { path: '1', component: AppPieComponent },
          { path: '2', component: AppMoodLineComponent },
          { path: '3', component: AppMoodScatterComponent }
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
