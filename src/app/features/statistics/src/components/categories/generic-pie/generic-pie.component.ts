import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { ITimeBucket, IQuestionaireItem } from '@shared/types/server';
import { environment } from 'environments/environment';
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

  data1$: Observable<ITimeBucket<IQuestionaireItem[]>[]>;
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

    this.data1$.pipe(take(1)).subscribe((timeBuckets: ITimeBucket<IQuestionaireItem[]>[]) => {
      this.options = timeBuckets[0].data.map(x => x.option);
      this.values1 = timeBuckets[0].data.map(x => x.value);
    });

    if(this.comparisonActive) {
      this.data2$ = this.statisticsDataAccessService.getStatistics(
        this.urlSuffix2,
        this.dateFrom,
        this.daysToRequest,
        EAggregation.NO_AGGREGATION,
      );
  
      this.data2$.pipe(take(1)).subscribe((timeBuckets: ITimeBucket<IQuestionaireItem[]>[]) => {
        this.values2 = timeBuckets[0].data.map(x => x.value);
      });
    }
}

}
