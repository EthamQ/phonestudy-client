import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { DateService } from '@shared/services';
import { GenericPieComponent } from '../../generic-pie/generic-pie.component';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';

@Component({
  selector: 'app-stress-pie',
  templateUrl: '../../generic-pie/generic-pie.component.html',
  styleUrls: ['../../generic-pie/generic-pie.component.scss']
})
export class StressPieComponent extends GenericPieComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
    ) {
      super(statisticsDataAccessService, dateService);
      this.category = ECategory.STRESS;
    }
}
