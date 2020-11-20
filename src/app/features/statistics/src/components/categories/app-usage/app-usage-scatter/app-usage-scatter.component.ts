import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { environment } from 'environments/environment';
import { EColorStyle } from '../../../charts';
import { GenericScatterComponent } from '../../generic-scatter/generic-scatter.component';

@Component({
  selector: 'app-app-usage-scatter',
  templateUrl: '../../generic-scatter/generic-scatter.component.html',
  styleUrls: ['./app-usage-scatter.component.scss']
})
export class AppUsageScatterComponent extends GenericScatterComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
  ) {
    super(statisticsDataAccessService, dateService);
    this.category = ECategory.APP;

    this.comparisonActive = environment.comparisonAll || environment.comparisonDemographic;

    if (environment.comparisonAll) {
      this.urlSuffix = 'communication/multi-all';
    } else {
      this.urlSuffix = 'communication/single-correlation';
    }

  }

}
