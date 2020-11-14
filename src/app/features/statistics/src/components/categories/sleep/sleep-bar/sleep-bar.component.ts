import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { GenericBarComponent } from '../../generic-bar/generic-bar.component';
import { StatisticsMappingService } from 'app/features/statistics/src/data-mapping/services/statistics-mapping/statistics-mapping.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-sleep-bar',
  templateUrl: '../../generic-bar/generic-bar.component.html',
  styleUrls: ['./sleep-bar.component.scss']
})
export class SleepBarComponent extends GenericBarComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    statisticsMappingService: StatisticsMappingService,
    dateService: DateService,
  ) {
    super(statisticsDataAccessService, statisticsMappingService, dateService);
    this.category = ECategory.SLEEP;
    this.comparisonActive = environment.comparisonAll || environment.comparisonDemographic;
    this.urlSuffix1 = 'sleep/user';
    this.urlSuffix2 = 'sleep/all';
  }

}
