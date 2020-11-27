import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { environment } from 'environments/environment';
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
    this.categories = [
      ECategory.APP,
      ECategory.STRESS,
      ECategory.MOOD,
      ECategory.SLEEP
    ];

    this.multipleOptions = true;
    this.comparisonActive = environment.comparisonAll || environment.comparisonDemographic;

    this.urlSuffix = 'app';

    this.textX = 'App geöffnet';

    this.requestPayload = {
      compareWith: environment.comparisonAll ? 'all' : 'none',
      type: 'correlation',
      aggregation: 'total & average',
    };
  }

}
