import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { BarChartService } from 'app/features/statistics/src/data-mapping/services/statistics-mapping/bar-chart/bar-chart.service';
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
    barChartService: BarChartService,
    dateService: DateService,
  ) {
    super(statisticsDataAccessService, barChartService, dateService);
    this.category = ECategory.MOOD;
    
    this.comparisonActive = environment.comparisonAll || environment.comparisonDemographic;

    if(environment.comparisonAll) {
      this.urlSuffix = 'mood/multi-all';
    } else {
      this.urlSuffix = 'mood/single';
    }
  }

}
