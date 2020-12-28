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

import { StatisticHeaderComponent } from './src/components/header/statistic-header/statistic-header.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticRouterOutletComponent } from './src/components/statistic-router-outlet/statistic-router-outlet.component';
import { StatisticsDataAccessService } from './src/data-access/services/statistics-data-access.service';

import { GenericPieComponent } from './src/components/generic-chart-views/generic-pie/generic-pie.component';
import { SleepBarComponent } from './src/components/categories/sleep/sleep-bar/sleep-bar.component';
import { SleepPieComponent } from './src/components/categories/sleep/sleep-pie/sleep-pie.component';
import { AppUsageBarComponent } from './src/components/categories/app-usage/app-usage-bar/app-usage-bar.component';
import { AppUsagePieComponent } from './src/components/categories/app-usage/app-usage-pie/app-usage-pie.component';
import { CommunicationBarComponent } from './src/components/categories/communication/communication-bar/communication-bar.component';
import { CommunicationPieComponent } from './src/components/categories/communication/communication-pie/communication-pie.component';
import { GenericBarComponent } from './src/components/generic-chart-views/generic-bar/generic-bar.component';
import { AppUsageScatterComponent } from './src/components/categories/app-usage/app-usage-scatter/app-usage-scatter.component';
import { GenericScatterComponent } from './src/components/generic-chart-views/generic-scatter/generic-scatter.component';
import { CorrelationInfoComponent } from './src/components/generic-chart-views/generic-scatter/ui/correlation-info/correlation-info.component';
import { ScatterChartComponent } from './src/components/charts/scatter-chart/scatter-chart.component';
import { ChartsModule } from 'ng2-charts';
import { CommunicationScatterComponent } from './src/components/categories/communication/communication-scatter/communication-scatter.component';
import { CorrelationHeaderComponent } from './src/components/header/correlation-header/correlation-header.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { GenericChartComponent } from './src/components/generic-chart-views/generic-chart/generic-chart.component';
import { MatSliderModule } from '@angular/material/slider';
import { PieCategoryComponent } from './src/components/categories/pie-category/pie-category.component';
import { BarCategoryComponent } from './src/components/categories/bar-category/bar-category.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StatisticsRoutingModule,
    SharedModule,
    MatSelectModule,
    ChartsModule,
    MatProgressBarModule,
    MatDividerModule,
    MatSliderModule,
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
    AppUsageScatterComponent,
    GenericScatterComponent,
    ScatterChartComponent,
    CommunicationScatterComponent,
    CorrelationHeaderComponent,
    GenericChartComponent,
    CorrelationInfoComponent,
    PieCategoryComponent,
    BarCategoryComponent,
  ],
  providers: [StatisticsDataAccessService],
})
export class StatisticsModule { }
