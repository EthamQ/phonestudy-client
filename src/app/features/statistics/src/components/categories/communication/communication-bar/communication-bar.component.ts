import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { GenericBarComponent } from '../../generic-bar/generic-bar.component';

@Component({
  selector: 'app-communication-bar',
  templateUrl: '../../generic-bar/generic-bar.component.html',
  styleUrls: ['./communication-bar.component.scss']
})
export class CommunicationBarComponent extends GenericBarComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
  ) {
    super(statisticsDataAccessService, dateService);
    this.filterActive = false;
    this.category = ECategory.COMMUNICATION;
    this.url = 'communication-lengths'
  }
}
