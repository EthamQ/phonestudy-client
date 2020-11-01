import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { SharedModule } from '@shared/shared-ui.module';

import {
  StressPieComponent,
  StressBarComponent,
  MoodPieComponent,
  MoodBarComponent
} from './src/components/categories';

import {
  PieChartComponent,
  BarChartComponent
} from './src/components/charts';

import { StatisticHeaderComponent } from './src/components/statistic-header/statistic-header.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticRouterOutletComponent } from './src/components/statistic-router-outlet/statistic-router-outlet.component';
import { StatisticDetailPieComponent } from './src/components/statistic-pie/statistic-pie.component';
import { StatisticDetailBarComponent } from './src/components/statistics-bar/statistic-bar.component';
import { StatisticsDataAccessService } from './src/data-access/services/statistics-data-access.service';

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
