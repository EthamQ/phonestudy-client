import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { CorrelationCalculationService } from 'app/features/statistics/src/utils/correlation-calculation.service';
import { environment } from 'environments/environment';
import { GenericScatterComponent } from '../../generic-scatter/generic-scatter.component';

@Component({
  selector: 'app-app-usage-scatter',
  templateUrl: '../../generic-scatter/generic-scatter.component.html',
  styleUrls: ['../../generic-scatter/generic-scatter.component.scss'],
})
export class AppUsageScatterComponent extends GenericScatterComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
    correlationCalculationService: CorrelationCalculationService,
  ) {
    super(statisticsDataAccessService, dateService, correlationCalculationService);
    this.categories = [
      ECategory.APP,
      ECategory.STRESS,
      ECategory.MOOD,
      ECategory.SLEEP
    ];

    this.multipleOptions = true;
    this.comparisonActive = environment.compareWith !== 'none';

    this.urlSuffix = 'app';

    this.textX = 'App geöffnet';

    this.description = 'Korrelation App-Benutzung und';

    this.requestPayload = {
      compareWith: environment.compareWith,
      type: 'correlation',
      aggregation: 'total & average',
    };
  }

}
