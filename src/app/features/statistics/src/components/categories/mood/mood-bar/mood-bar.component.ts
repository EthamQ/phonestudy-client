import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { StatisticsMappingService } from 'app/features/statistics/src/data-mapping/services/statistics-mapping/statistics-mapping.service';
import { environment } from 'environments/environment';
import { GenericBarComponent } from '../../generic-bar/generic-bar.component';

@Component({
  selector: 'app-mood-bar',
  templateUrl: '../../generic-bar/generic-bar.component.html',
  styleUrls: ['./mood-bar.component.scss']
})
export class MoodBarComponent extends GenericBarComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    statisticsMappingService: StatisticsMappingService,
    dateService: DateService,
  ) {
    super(statisticsDataAccessService, statisticsMappingService, dateService);
    this.category = ECategory.MOOD;
    this.comparisonActive = environment.comparisonAll || environment.comparisonDemographic;

    if(environment.comparisonAll) {
      this.urlSuffix = 'mood/multi-all';
    } else {
      this.urlSuffix = 'mood/single';
    }
  }

}
