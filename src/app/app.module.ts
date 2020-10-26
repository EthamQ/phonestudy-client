import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategorySelectionComponent } from './features/category-selection/category-selection.component';
import { LoginComponent } from './core/login/login.component';
import { ContactDetailsComponent } from './features/contact-details/contact-details.component';
import { MusicDetailsComponent } from './features/music-details/music-details.component';
import { MusicPieComponent } from './features/music-details/music-pie/music-pie.component';
import { MusicMoodLineComponent } from './features/music-details/music-mood-line/music-mood-line.component';
import { MusicMoodScatterComponent } from './features/music-details/music-mood-scatter/music-mood-scatter.component';
import { AppDetailsComponent } from './features/app-details/app-details.component';
import { AppPieComponent } from './features/app-details/app-pie/app-pie.component';
import { AppMoodLineComponent } from './features/app-details/app-mood-line/app-mood-line.component';
import { AppMoodScatterComponent } from './features/app-details/app-mood-scatter/app-mood-scatter.component';
import { MoodPieComponent } from './features/statistics/mood/mood-pie/mood-pie.component';
import { MoodBarComponent } from './features/statistics/mood/mood-bar/mood-bar.component';
import { StatisticDetailComponent } from './features/statistics/statistic-detail/statistic-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    CategorySelectionComponent,
    ContactDetailsComponent,
    LoginComponent,
    MusicDetailsComponent,
    MusicPieComponent,
    MusicMoodLineComponent,
    MusicMoodScatterComponent,
    AppDetailsComponent,
    AppPieComponent,
    AppMoodLineComponent,
    AppMoodScatterComponent,
    MoodPieComponent,
    MoodBarComponent,
    StatisticDetailComponent,
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
