import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { EColorStyle } from '../../../charts';
import { GenericPieComponent } from '../../../generic-chart-views/generic-pie/generic-pie.component';
import { environment } from 'environments/environment';
import { ColorService } from 'app/features/statistics/src/utils/color.service';

@Component({
  selector: 'app-mood-pie',
  templateUrl: '../../../generic-chart-views/generic-pie/generic-pie.component.html',
  styleUrls: ['../../../generic-chart-views/generic-pie/generic-pie.component.scss']
})
export class MoodPieComponent extends GenericPieComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
    colorService: ColorService,
    ) {
      super(statisticsDataAccessService, dateService, colorService);
      this.category = ECategory.MOOD;
      this.colorStyle = EColorStyle.ASCENDING;
      
      this.comparisonActive = environment.compareWith !== 'none';

      this.description = 'Verteilung Gefühlszustand insgesamt';

      this.urlSuffix = 'mood';

      this.requestPayload = {
        compareWith: environment.compareWith,
        type: 'simple',
        aggregation: 'total',
      };
    }

}
