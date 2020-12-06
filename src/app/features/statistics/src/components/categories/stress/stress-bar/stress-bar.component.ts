import { ChangeDetectorRef, Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { environment } from 'environments/environment';
import { StatisticsDataAccessService } from '../../../../data-access/services/statistics-data-access.service';
import { GenericBarComponent } from '../../../generic-chart-views/generic-bar/generic-bar.component';

@Component({
  selector: 'app-stress-bar',
  templateUrl: '../../../generic-chart-views/generic-bar/generic-bar.component.html',
  styleUrls: ['./stress-bar.component.scss']
})
export class StressBarComponent extends GenericBarComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
  ) {
    super(statisticsDataAccessService, dateService);
    this.category = ECategory.STRESS;
    this.comparisonActive = environment.compareWith !== 'none';
    
    this.urlSuffix = 'stress';

    this.description = 'Verteilung Stresslevel pro Wochentag';

    this.requestPayload = {
      compareWith: environment.compareWith,
      type: 'simple',
      aggregation: 'average',
    };
  }

}
