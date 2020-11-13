import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { GenericBarComponent } from '../../generic-bar/generic-bar.component';

@Component({
  selector: 'app-mood-bar',
  templateUrl: '../../generic-bar/generic-bar.component.html',
  styleUrls: ['./mood-bar.component.scss']
})
export class MoodBarComponent extends GenericBarComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
  ) {
    super(statisticsDataAccessService, dateService);
    this.category = ECategory.MOOD;
    this.urlSuffix = 'mood';
  }

}
