import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { CategorySelectionComponent } from './features/category-selection/category-selection.component';
import { ContactDetailsComponent } from './features/category-selection/contact-details/contact-details.component';
import { MusicDetailsComponent } from './features/category-selection/music-details/music-details.component';
import { MusicGraphComponent } from './features/category-selection/music-details/music-graph/music-graph.component';
import { MusicMoodGraphComponent } from './features/category-selection/music-details/music-mood-graph/music-mood-graph.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'select', component: CategorySelectionComponent, children: [
      { path: 'contact', component: ContactDetailsComponent },
      { path: 'music', component: MusicDetailsComponent, children: [
        { path: '1', component: MusicGraphComponent },
        { path: '2', component: MusicMoodGraphComponent }
      ] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
