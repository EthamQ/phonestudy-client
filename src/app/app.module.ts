import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { CategorySelectionComponent } from './core/category-selection/category-selection.component';  
import { SharedUiModule } from '@shared/shared-ui.module';


@NgModule({
  declarations: [
    AppComponent,
    CategorySelectionComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ChartsModule,
    SharedUiModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
