import { ChangeDetectorRef, Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { environment } from 'environments/environment';
import { GenericBarComponent } from '../../../generic-chart-views/generic-bar/generic-bar.component';

@Component({
  selector: 'app-app-usage-bar',
  templateUrl: '../../../generic-chart-views/generic-bar/generic-bar.component.html',
  styleUrls: ['../../../generic-chart-views/generic-bar/generic-bar.component.scss']
})
export class AppUsageBarComponent extends GenericBarComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
  ) {
    super(statisticsDataAccessService, dateService);
    this.filterActive = true;
    this.category = ECategory.APP;
    
    this.comparisonActive = environment.compareWith !== 'none';

    this.urlSuffix = 'app';

    this.description = 'Verteilung App-Benutzung pro Wochentag';

    this.requestPayload = {
      compareWith: environment.compareWith,
      type: 'simple',
      aggregation: 'total',
    };
  }

}
