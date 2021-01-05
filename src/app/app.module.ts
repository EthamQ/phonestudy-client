import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { CategorySelectionComponent } from '@core/components/category-selection/category-selection.component';  
import { SharedModule } from '@shared/shared-ui.module';
import { AuthenticationComponent } from '@core/components/authentication/authentication.component';
import { ErrorComponent } from '@core/components/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirstOutletComponent } from './features/first-outlet/first-outlet.component';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';



@NgModule({
  declarations: [
    AppComponent,
    CategorySelectionComponent,
    AuthenticationComponent,
    ErrorComponent,
    FirstOutletComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    NgxGoogleAnalyticsModule.forRoot('UA-186205661-1'),
    NgxGoogleAnalyticsRouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
