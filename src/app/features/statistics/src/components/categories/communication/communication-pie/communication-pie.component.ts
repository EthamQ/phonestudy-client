import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { EColorStyle } from '../../../charts';
import { GenericPieComponent } from '../../generic-pie/generic-pie.component';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-communication-pie',
  templateUrl: '../../generic-pie/generic-pie.component.html',
  styleUrls: ['../../generic-pie/generic-pie.component.scss']
})
export class CommunicationPieComponent extends GenericPieComponent{

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
    ) {
      super(statisticsDataAccessService, dateService);
      this.comparisonActive = environment.comparisonAll || environment.comparisonDemographic;
      this.category = ECategory.COMMUNICATION;
      this.colorStyle = EColorStyle.RANDOM;
      this.urlSuffix = 'communication/single-category';

      if (environment.comparisonAll) {
        this.urlSuffix = 'communication/multi-category-all';
      } else {
        this.urlSuffix = 'communication/single-category';
      }
    }
}
