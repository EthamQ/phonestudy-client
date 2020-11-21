import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { DateService } from '@shared/services';
import { GenericPieComponent } from '../../generic-pie/generic-pie.component';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { EColorStyle } from '../../../charts';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-stress-pie',
  templateUrl: '../../generic-pie/generic-pie.component.html',
  styleUrls: ['../../generic-pie/generic-pie.component.scss']
})
export class StressPieComponent extends GenericPieComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
    ) {
      super(statisticsDataAccessService, dateService);
      this.category = ECategory.STRESS;
      this.colorStyle = EColorStyle.DESCENDING;
      this.comparisonActive = environment.comparisonAll || environment.comparisonDemographic;

      this.urlSuffix = 'stress';

      this.requestPayload = {
        compareWith: environment.comparisonAll ? 'all' : 'none',
        type: 'simple',
        aggregation: 'weight',
      };
    }
}
