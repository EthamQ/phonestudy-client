import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { IBasicResponse, ICorrelation, ITimeBucket } from '@shared/types/server';
import { ChartPoint } from 'chart.js';
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
  daysToRequest = 14;
  dateFrom: string;
  dateTo: string;
  urlSuffix: string;

  requestPayload = {
    compareWith: 'none',
    type: 'correlation',
    aggregation: 'length',
  };

  data1$: Observable<ITimeBucket<IBasicResponse<ICorrelation>>[]>;

  valuesStress: ChartPoint[];
  valuesMood: ChartPoint[];
  valuesSleep: ChartPoint[];

  values1: ChartPoint[];

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
      this.requestPayload
    );

    this.data1$.subscribe(x => {
      console.log(x);
      this.valuesStress = x.map(y => ({ x: y.data.user.option, y: y.data.user.stress }));
      this.valuesMood = x.map(y => ({ x: y.data.user.option, y: y.data.user.mood }));
      this.valuesSleep = x.map(y => ({ x: y.data.user.option, y: y.data.user.sleep }));

      this.values1 = this.valuesStress;
    });
  }

}
