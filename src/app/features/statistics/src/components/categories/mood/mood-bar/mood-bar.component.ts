import { ChangeDetectorRef, Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { environment } from 'environments/environment';
import { GenericBarComponent } from '../../../generic-chart-views/generic-bar/generic-bar.component';

@Component({
  selector: 'app-mood-bar',
  templateUrl: '../../../generic-chart-views/generic-bar/generic-bar.component.html',
  styleUrls: ['./mood-bar.component.scss']
})
export class MoodBarComponent extends GenericBarComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
  ) {
    super(statisticsDataAccessService, dateService);
    this.category = ECategory.MOOD;
    
    this.comparisonActive = environment.compareWith !== 'none';

    this.urlSuffix = 'mood';

    this.description = 'Verteilung Gefühlszustand pro Wochentag';
    
    this.requestPayload = {
      compareWith: environment.compareWith,
      type: 'simple',
      aggregation: 'average-by-weekday',
    };
  }

}
