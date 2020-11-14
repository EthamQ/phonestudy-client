import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { GenericPieComponent } from '../../generic-pie/generic-pie.component';
import { EColorStyle } from '../../../charts';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-sleep-pie',
  templateUrl: '../../generic-pie/generic-pie.component.html',
  styleUrls: ['../../generic-pie/generic-pie.component.scss']
})
export class SleepPieComponent extends GenericPieComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
  ) {
    super(statisticsDataAccessService, dateService);
    this.category = ECategory.SLEEP;
    this.colorStyle = EColorStyle.DESCENDING;
    this.urlSuffix = 'sleep/user';
    this.urlSuffix2 = 'sleep/all';
    this.comparisonActive = environment.comparisonAll || environment.comparisonDemographic;
  }

}
