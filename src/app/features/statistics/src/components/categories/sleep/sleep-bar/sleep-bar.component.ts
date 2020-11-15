import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { GenericBarComponent } from '../../generic-bar/generic-bar.component';
import { environment } from 'environments/environment';
import { BarChartService } from 'app/features/statistics/src/data-mapping/services/statistics-mapping/bar-chart/bar-chart.service';

@Component({
  selector: 'app-sleep-bar',
  templateUrl: '../../generic-bar/generic-bar.component.html',
  styleUrls: ['./sleep-bar.component.scss']
})
export class SleepBarComponent extends GenericBarComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    barChartService: BarChartService,
    dateService: DateService,
  ) {
    super(statisticsDataAccessService, barChartService, dateService);
    this.category = ECategory.SLEEP;
    
    this.comparisonActive = environment.comparisonAll || environment.comparisonDemographic;
    
    if(environment.comparisonAll) {
      this.urlSuffix = 'sleep/multi-all';
    } else {
      this.urlSuffix = 'sleep/single';
    }
  }

}
