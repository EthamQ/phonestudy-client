import { NgModule } from '@angular/core';
import { StatisticHeaderComponent } from './statistic-header/statistic-header.component';
import { StressPieComponent } from './stress/stress-pie/stress-pie.component';
import { StressBarComponent } from './stress/stress-bar/stress-bar.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { StatisticDetailComponent } from './statistic-detail/statistic-detail.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { CommonModule } from '@angular/common';  
import { SharedUiModule } from '../../shared/shared-ui.module';


@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    StatisticsRoutingModule,
    SharedUiModule,
  ],
  declarations: [
    PieChartComponent,
    BarChartComponent,
    StatisticHeaderComponent,
    StatisticDetailComponent,
    StressBarComponent,
    StressPieComponent,
  ],
  providers: [],
})
export class StatisticsModule { }
