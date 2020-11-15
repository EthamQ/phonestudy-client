import { NgModule } from '@angular/core';
import { DetailViewRoutingModule } from './detail-view-routing.module';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';  
import { DetailViewOutletComponent } from './components/detail-view-outlet/detail-view-outlet.component';


@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    DetailViewRoutingModule,
  ],
  declarations: [
  DetailViewOutletComponent],
  exports: [ChartsModule],
  providers: [],
})
export class DetailViewModule { }
