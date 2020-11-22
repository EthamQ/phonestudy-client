import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { GenericBarComponent } from '../../generic-bar/generic-bar.component';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-sleep-bar',
  templateUrl: '../../generic-bar/generic-bar.component.html',
  styleUrls: ['./sleep-bar.component.scss']
})
export class SleepBarComponent extends GenericBarComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
  ) {
    super(statisticsDataAccessService, dateService);
    this.category = ECategory.SLEEP;
    
    this.comparisonActive = environment.comparisonAll || environment.comparisonDemographic;
    
    this.urlSuffix = 'sleep';
    
    this.requestPayload = {
      compareWith: environment.comparisonAll ? 'all' : 'none',
      type: 'simple',
      aggregation: 'average',
    };
  }

}
