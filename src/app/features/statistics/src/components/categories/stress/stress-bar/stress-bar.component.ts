import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { environment } from 'environments/environment';
import { StatisticsDataAccessService } from '../../../../data-access/services/statistics-data-access.service';
import { GenericBarComponent } from '../../generic-bar/generic-bar.component';
import { StatisticsMappingService } from 'app/features/statistics/src/data-mapping/services/statistics-mapping/statistics-mapping.service';
import { BarChartService } from 'app/features/statistics/src/data-mapping/services/statistics-mapping/bar-chart/bar-chart.service';

@Component({
  selector: 'app-stress-bar',
  templateUrl: '../../generic-bar/generic-bar.component.html',
  styleUrls: ['./stress-bar.component.scss']
})
export class StressBarComponent extends GenericBarComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    barChartService: BarChartService,
    dateService: DateService,
  ) {
    super(statisticsDataAccessService, barChartService, dateService);
    this.category = ECategory.STRESS;
    this.comparisonActive = environment.comparisonAll || environment.comparisonDemographic;
    
    if(environment.comparisonAll) {
      this.urlSuffix = 'stress/multi-all';
    } else {
      this.urlSuffix = 'stress/single';
    }
  }

}
