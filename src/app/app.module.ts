import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategorySelectionComponent } from './features/category-selection/category-selection.component';
import { LoginComponent } from './core/login/login.component';
import { ContactDetailsComponent } from './features/category-selection/contact-details/contact-details.component';
import { MusicDetailsComponent } from './features/category-selection/music-details/music-details.component';
import { MusicGraphComponent } from './features/category-selection/music-details/music-graph/music-graph.component';
import { MusicMoodGraphComponent } from './features/category-selection/music-details/music-mood-graph/music-mood-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    CategorySelectionComponent,
    ContactDetailsComponent,
    LoginComponent,
    MusicDetailsComponent,
    MusicGraphComponent,
    MusicMoodGraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
