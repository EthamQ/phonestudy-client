import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { environment } from 'environments/environment';
import { GenericScatterComponent } from '../../generic-scatter/generic-scatter.component';

@Component({
  selector: 'app-communication-scatter',
  templateUrl: '../../generic-scatter/generic-scatter.component.html',
  styleUrls: ['./communication-scatter.component.scss']
})
export class CommunicationScatterComponent extends GenericScatterComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
  ) {
    super(statisticsDataAccessService, dateService);
    this.categories = [
      ECategory.COMMUNICATION,
      ECategory.STRESS,
      ECategory.MOOD,
      ECategory.SLEEP
    ];

    this.urlSuffix = 'communication';

    this.textX = 'Minuten telefoniert';

    this.requestPayload = {
      compareWith: environment.comparisonAll ? 'all' : 'none',
      type: 'correlation',
      aggregation: 'length',
    };

  }

}
