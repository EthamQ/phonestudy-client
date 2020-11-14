import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { environment } from 'environments/environment';
import { EColorStyle } from '../../../charts';
import { GenericPieComponent } from '../../generic-pie/generic-pie.component';

@Component({
  selector: 'app-app-usage-pie',
  templateUrl: '../../generic-pie/generic-pie.component.html',
  styleUrls: ['../../generic-pie/generic-pie.component.scss']
})
export class AppUsagePieComponent extends GenericPieComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
    ) {
      super(statisticsDataAccessService, dateService);
      this.comparisonActive = environment.comparisonAll || environment.comparisonDemographic;
      this.category = ECategory.APP;
      this.colorStyle = EColorStyle.RANDOM;
      this.urlSuffix = 'app/user';
      this.urlSuffix2 = 'app/all';
    }

}
