import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { CategorySelectionComponent } from './features/category-selection/category-selection.component';
import { ContactDetailsComponent } from './features/contact-details/contact-details.component';
import { MusicDetailsComponent } from './features/music-details/music-details.component';
import { MusicPieComponent } from './features/music-details/music-pie/music-pie.component';
import { MusicMoodLineComponent } from './features/music-details/music-mood-line/music-mood-line.component';
import { MusicMoodScatterComponent } from './features/music-details/music-mood-scatter/music-mood-scatter.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'select', component: CategorySelectionComponent, children: [
      { path: 'contact', component: ContactDetailsComponent },
      { path: 'music', component: MusicDetailsComponent, children: [
        { path: '1', component: MusicPieComponent },
        { path: '2', component: MusicMoodLineComponent },
        { path: '3', component: MusicMoodScatterComponent }
      ] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
