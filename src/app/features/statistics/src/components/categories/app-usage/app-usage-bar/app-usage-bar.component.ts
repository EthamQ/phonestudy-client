import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { GenericBarComponent } from '../../generic-bar/generic-bar.component';

@Component({
  selector: 'app-app-usage-bar',
  templateUrl: '../../generic-bar/generic-bar.component.html',
  styleUrls: ['../../generic-bar/generic-bar.component.scss']
})
export class AppUsageBarComponent extends GenericBarComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
  ) {
    super(statisticsDataAccessService, dateService);
    this.filterActive = true;
    this.category = ECategory.APP;
    this.urlSuffix = 'app/null';
  }

}
