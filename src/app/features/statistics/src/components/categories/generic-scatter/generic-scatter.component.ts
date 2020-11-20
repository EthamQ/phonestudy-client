import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { ICorrelation, ITimeBucket } from '@shared/types/server';
import { Observable } from 'rxjs';
import { EAggregation, StatisticsDataAccessService } from '../../../data-access/services/statistics-data-access.service';

@Component({
  selector: 'app-generic-scatter',
  templateUrl: './generic-scatter.component.html',
  styleUrls: ['./generic-scatter.component.scss']
})
export class GenericScatterComponent implements OnInit {

  comparisonActive: boolean;
  category: ECategory;
  daysToRequest = 7;
  dateFrom: string;
  dateTo: string;
  urlSuffix: string;

  data1$: Observable<ITimeBucket<ICorrelation>[]>;

  values1 = [
    { x: 1, y: 1 },
    { x: 2, y: 3 },
    { x: 3, y: 4 },
    { x: 4, y: 7 },
    { x: 5, y: 12 },
  ];

  values2 = [
    { x: 3, y: 1 },
    { x: 4, y: 3 },
    { x: 5, y: 4 },
    { x: 2, y: 7 },
    { x: 1, y: 12 },
  ];

  textX = 'App';
  textY = 'Stress';

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
    ) {  }

  ngOnInit() {
    this.dateFrom = '2020-08-01';
    this.dateTo = this.dateService.addDays(this.dateFrom, this.daysToRequest);

    this.data1$ = this.statisticsDataAccessService.getCorrelation(
      this.urlSuffix,
      this.dateFrom,
      this.daysToRequest,
      EAggregation.DAYS,
    );

    this.data1$.subscribe(x => console.log(x));
  }

}
