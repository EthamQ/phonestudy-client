import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { MatSelectModule } from '@angular/material/select';

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
import { StatisticsDataAccessService } from './src/data-access/services/statistics-data-access.service';

import { DetailViewModule } from '../detail-view/detail-view.module';
import { GenericPieComponent } from './src/components/categories/generic-pie/generic-pie.component';
import { SleepBarComponent } from './src/components/categories/sleep/sleep-bar/sleep-bar.component';
import { SleepPieComponent } from './src/components/categories/sleep/sleep-pie/sleep-pie.component';
import { AppUsageBarComponent } from './src/components/categories/app-usage/app-usage-bar/app-usage-bar.component';
import { AppUsagePieComponent } from './src/components/categories/app-usage/app-usage-pie/app-usage-pie.component';
import { CommunicationBarComponent } from './src/components/categories/communication/communication-bar/communication-bar.component';
import { CommunicationPieComponent } from './src/components/categories/communication/communication-pie/communication-pie.component';
import { GenericBarComponent } from './src/components/categories/generic-bar/generic-bar.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    DetailViewModule,
    StatisticsRoutingModule,
    SharedModule,
    MatSelectModule,
  ],
  declarations: [
    PieChartComponent,
    BarChartComponent,
    StatisticHeaderComponent,
    StressBarComponent,
    StressPieComponent,
    MoodPieComponent,
    MoodBarComponent,
    SleepPieComponent,
    SleepBarComponent,
    StatisticRouterOutletComponent,
    GenericPieComponent,
    GenericBarComponent,
    AppUsagePieComponent,
    AppUsageBarComponent,
    CommunicationPieComponent,
    CommunicationBarComponent,
  ],
  providers: [StatisticsDataAccessService],
})
export class StatisticsModule { }
