import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { IBasicResponse, ICorrelation, IRequestPayload, ITimeBucket } from '@shared/types/server';
import { ChartPoint } from 'chart.js';
import { Observable } from 'rxjs';
import { EAggregation, StatisticsDataAccessService } from '../../../data-access/services/statistics-data-access.service';

@Component({
  selector: 'app-generic-scatter',
  templateUrl: './generic-scatter.component.html',
  styleUrls: ['./generic-scatter.component.scss']
})
export class GenericScatterComponent implements OnInit {

  categories: ECategory[];
  selectedCategory: ECategory;
  comparisonActive: boolean;
  daysToRequest = 14;
  dateFrom: string;
  dateTo: string;
  urlSuffix: string;
  requestPayload: IRequestPayload;

  data$: Observable<ITimeBucket<IBasicResponse<ICorrelation>>[]>;

  valuesStress: ChartPoint[];
  valuesMood: ChartPoint[];
  valuesSleep: ChartPoint[];

  valuesStressCompare: ChartPoint[];
  valuesMoodCompare: ChartPoint[];
  valuesSleepCompare: ChartPoint[];

  values1: ChartPoint[];
  values2: ChartPoint[];

  textX = '';
  textY = '';

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
    ) {  }

  ngOnInit() {
    this.dateFrom = '2020-08-01';
    this.dateTo = this.dateService.addDays(this.dateFrom, this.daysToRequest);

    this.data$ = this.statisticsDataAccessService.getCorrelation(
      this.urlSuffix,
      this.dateFrom,
      this.daysToRequest,
      EAggregation.DAYS,
      this.requestPayload
    );

    this.data$.subscribe(x => {
      this.valuesStress = x.map(y => ({ x: y.data.user.option, y: y.data.user.stress }));
      this.valuesMood = x.map(y => ({ x: y.data.user.option, y: y.data.user.mood }));
      this.valuesSleep = x.map(y => ({ x: y.data.user.option, y: y.data.user.sleep }));

      if(this.comparisonActive) {
        this.valuesStressCompare = x.map(y => ({ x: y.data.compare.option, y: y.data.compare.stress }));
        this.valuesMoodCompare = x.map(y => ({ x: y.data.compare.option, y: y.data.compare.mood }));
        this.valuesSleepCompare = x.map(y => ({ x: y.data.compare.option, y: y.data.compare.sleep }));
      }

      this.onCategoryClicked(ECategory.STRESS);
    });
  }

  onCategoryClicked(category: ECategory) {
    this.selectedCategory = category;

    if(category === ECategory.STRESS) {
      this.values1 = this.valuesStress;
      this.values2 = this.valuesStressCompare;
      this.textY = 'Stresslevel';
    }
    if(category === ECategory.MOOD) {
      this.values1 = this.valuesMood;
      this.values2 = this.valuesMoodCompare;
      this.textY = 'Gefühlszustand';
    }
    if(category === ECategory.SLEEP) {
      this.values1 = this.valuesSleep;
      this.values2 = this.valuesSleepCompare;
      this.textY = 'Schlafqualität';
    }
  }

}
