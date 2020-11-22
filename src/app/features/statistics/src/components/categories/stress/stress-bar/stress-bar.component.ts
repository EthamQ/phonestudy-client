import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { environment } from 'environments/environment';
import { StatisticsDataAccessService } from '../../../../data-access/services/statistics-data-access.service';
import { GenericBarComponent } from '../../generic-bar/generic-bar.component';

@Component({
  selector: 'app-stress-bar',
  templateUrl: '../../generic-bar/generic-bar.component.html',
  styleUrls: ['./stress-bar.component.scss']
})
export class StressBarComponent extends GenericBarComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
  ) {
    super(statisticsDataAccessService, dateService);
    this.category = ECategory.STRESS;
    this.comparisonActive = environment.comparisonAll || environment.comparisonDemographic;
    
    this.urlSuffix = 'stress';

    this.requestPayload = {
      compareWith: environment.comparisonAll ? 'all' : 'none',
      type: 'simple',
      aggregation: 'average',
    };
  }

}
