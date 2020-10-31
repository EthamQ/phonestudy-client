import { NgModule } from '@angular/core';
import { StatisticHeaderComponent } from './detail-view/statistic-header/statistic-header.component';
import { StressPieComponent } from './categories/stress/stress-pie/stress-pie.component';
import { StressBarComponent } from './categories/stress/stress-bar/stress-bar.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { PieChartComponent } from './categories/charts/pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './categories/charts/bar-chart/bar-chart.component';
import { CommonModule } from '@angular/common';  
import { SharedModule } from '../../shared/shared-ui.module';
import { MoodPieComponent } from './categories/mood/mood-pie/mood-pie.component';
import { MoodBarComponent } from './categories/mood/mood-bar/mood-bar.component';
import { StatisticRouterOutletComponent } from './statistic-router-outlet/statistic-router-outlet.component';
import { StatisticDetailPieComponent } from './detail-view/statistic-detail-pie/statistic-detail-pie.component';
import { StatisticDetailBarComponent } from './detail-view/statistic-detail-bar/statistic-detail-bar.component';
import { StatisticsDataAccessService } from './data-access/statistics-data-access.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ChartsModule,
    StatisticsRoutingModule,
    SharedModule,
  ],
  declarations: [
    PieChartComponent,
    BarChartComponent,
    StatisticHeaderComponent,
    StressBarComponent,
    StressPieComponent,
    MoodPieComponent,
    MoodBarComponent,
    StatisticRouterOutletComponent,
    StatisticDetailPieComponent,
    StatisticDetailBarComponent,
  ],
  providers: [StatisticsDataAccessService],
})
export class StatisticsModule { }
