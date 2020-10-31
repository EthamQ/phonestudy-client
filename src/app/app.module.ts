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


@NgModule({
  declarations: [
    AppComponent,
    CategorySelectionComponent,
    AuthenticationComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ChartsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
