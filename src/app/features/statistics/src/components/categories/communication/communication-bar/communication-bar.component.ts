import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { GenericBarComponent } from '../../generic-bar/generic-bar.component';
import { BarChartService } from 'app/features/statistics/src/data-mapping/services/statistics-mapping/bar-chart/bar-chart.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-communication-bar',
  templateUrl: '../../generic-bar/generic-bar.component.html',
  styleUrls: ['./communication-bar.component.scss']
})
export class CommunicationBarComponent extends GenericBarComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    barChartService: BarChartService,
    dateService: DateService,
  ) {
    super(statisticsDataAccessService, barChartService, dateService);
    this.filterActive = false;
    this.category = ECategory.COMMUNICATION;

    this.comparisonActive = environment.comparisonAll || environment.comparisonDemographic;

    this.urlSuffix = 'communication';

    this.requestPayload = {
      compareWith: environment.comparisonAll ? 'all' : 'none',
      type: 'simple',
      aggregation: 'length',
    };
  }
}
