import { NgModule } from '@angular/core';
import { StatisticHeaderComponent } from './src/components/detail-view/statistic-header/statistic-header.component';
import { StressPieComponent } from './src/components/categories/stress/stress-pie/stress-pie.component';
import { StressBarComponent } from './src/components/categories/stress/stress-bar/stress-bar.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { PieChartComponent } from './src/components/categories/charts/pie-chart/pie-chart.component';
import { BarChartComponent } from './src/components/categories/charts/bar-chart/bar-chart.component';
import { CommonModule } from '@angular/common';  
import { SharedModule } from '../../shared/shared-ui.module';
import { MoodPieComponent } from './src/components/categories/mood/mood-pie/mood-pie.component';
import { MoodBarComponent } from './src/components/categories/mood/mood-bar/mood-bar.component';
import { StatisticRouterOutletComponent } from './src/components/statistic-router-outlet/statistic-router-outlet.component';
import { StatisticDetailPieComponent } from './src/components/detail-view/statistic-detail-pie/statistic-detail-pie.component';
import { StatisticDetailBarComponent } from './src/components/detail-view/statistic-detail-bar/statistic-detail-bar.component';
import { StatisticsDataAccessService } from './src/data-access/services/statistics-data-access.service';
import { HttpClientModule } from '@angular/common/http';
import { DetailViewModule } from '../detail-view/detail-view.module';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    DetailViewModule,
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
