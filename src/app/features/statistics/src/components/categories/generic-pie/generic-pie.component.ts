import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ITimeBucket, IStatisticItem, IBasicResponse } from '@shared/types/server';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { StatisticsDataAccessService, EAggregation } from '../../../data-access/services/statistics-data-access.service';
import { EColorStyle } from '../../charts';
import { GenericChartComponent } from '../../generic-chart/generic-chart.component';

@Component({
  selector: 'app-generic-pie',
  template: '',
})
export class GenericPieComponent extends GenericChartComponent implements OnInit {

  data1$: Observable<ITimeBucket<IBasicResponse<IStatisticItem[]>>[]>;
  data2$: Observable<ITimeBucket<IStatisticItem[]>[]>;

  big: boolean;

  colorStyle: EColorStyle;

  options: string[];
  values1: number[];
  values2: number[];

  daysToRequest = 7;

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
    ) { 
      super();
     }

  ngOnInit(): void {
    this.dateFrom = '2020-08-01';
    this.dateTo = this.dateService.addDays(this.dateFrom, this.daysToRequest)

    this.data1$ = this.statisticsDataAccessService.getStatistics(
      this.urlSuffix,
      this.dateFrom,
      this.daysToRequest,
      EAggregation.NO_AGGREGATION,
      this.requestPayload,
    );

    this.data1$.pipe(take(1)).subscribe(timeBuckets => {
      this.options = timeBuckets[0].data.user.map(x => x.option);
      this.values1 = timeBuckets[0].data.user.map(x => x.value);
      this.big = this.values1.length > 10;

      if(this.comparisonActive) {  
        this.values2 = timeBuckets[0].data.compare.map(x => x.value);
      }
    });

}

}
