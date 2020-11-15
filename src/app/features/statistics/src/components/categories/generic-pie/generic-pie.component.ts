import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { ITimeBucket, IQuestionaireItem, IBasicResponse } from '@shared/types/server';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { StatisticsDataAccessService, EAggregation } from '../../../data-access/services/statistics-data-access.service';
import { EColorStyle } from '../../charts';

@Component({
  selector: 'app-generic-pie',
  template: '',
})
export class GenericPieComponent implements OnInit {

  comparisonActive: boolean;

  data1$: Observable<ITimeBucket<IBasicResponse>[]>;
  data2$: Observable<ITimeBucket<IQuestionaireItem[]>[]>;

  category: ECategory;
  colorStyle: EColorStyle;
  urlSuffix: string;
  urlSuffix2: string;

  options: string[];
  values1: number[];
  values2: number[];

  daysToRequest = 7;
  dateFrom: string;
  dateTo: string;

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
    ) {  }

  ngOnInit(): void {
    this.dateFrom = '2020-08-01';
    this.dateTo = this.dateService.addDays(this.dateFrom, this.daysToRequest)

    this.data1$ = this.statisticsDataAccessService.getStatistics(
      this.urlSuffix,
      this.dateFrom,
      this.daysToRequest,
      EAggregation.NO_AGGREGATION,
    );

    this.data1$.pipe(take(1)).subscribe(timeBuckets => {
      this.options = timeBuckets[0].data.user.map(x => x.option);
      this.values1 = timeBuckets[0].data.user.map(x => x.value);

      if(this.comparisonActive) {  
        this.values2 = timeBuckets[0].data.compare.map(x => x.value);
      }
    });

}

}
