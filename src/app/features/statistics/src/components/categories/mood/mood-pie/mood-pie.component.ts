import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { EColorStyle } from '../../../charts';
import { GenericPieComponent } from '../../../generic-chart-views/generic-pie/generic-pie.component';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-mood-pie',
  templateUrl: '../../../generic-chart-views/generic-pie/generic-pie.component.html',
  styleUrls: ['../../../generic-chart-views/generic-pie/generic-pie.component.scss']
})
export class MoodPieComponent extends GenericPieComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
    ) {
      super(statisticsDataAccessService, dateService);
      this.category = ECategory.MOOD;
      this.colorStyle = EColorStyle.DESCENDING;
      
      this.comparisonActive = environment.compareWith !== 'none';

      this.description = 'Verteilung Gefühlszustand insgesamt';

      this.urlSuffix = 'mood';

      this.requestPayload = {
        compareWith: environment.compareWith,
        type: 'simple',
        aggregation: 'weight',
      };
    }

}
