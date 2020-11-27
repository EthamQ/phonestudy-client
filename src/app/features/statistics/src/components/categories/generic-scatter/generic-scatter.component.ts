import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { IBasicResponse, ICorrelation, IRequestPayload, ITimeBucket } from '@shared/types/server';
import { ChartPoint } from 'chart.js';
import { Observable } from 'rxjs';
import { EAggregation, StatisticsDataAccessService } from '../../../data-access/services/statistics-data-access.service';
import * as _ from 'underscore';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-generic-scatter',
  templateUrl: './generic-scatter.component.html',
  styleUrls: ['./generic-scatter.component.scss']
})
export class GenericScatterComponent implements OnInit {

  categories: ECategory[];
  selectedCategory: ECategory;
  comparisonActive: boolean;
  multipleOptions: boolean;
  daysToRequest = 14;
  dateFrom: string;
  dateTo: string;
  urlSuffix: string;
  requestPayload: IRequestPayload;

  data$: Observable<ITimeBucket<IBasicResponse<ICorrelation>>[]>;

  filterByOption = '';
  uniqueOptions = [];

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
  ) { }

  ngOnInit(): void {
    this.dateFrom = '2020-08-01';
    this.dateTo = this.dateService.addDays(this.dateFrom, this.daysToRequest);

    this.data$ = this.statisticsDataAccessService.getCorrelation(
      this.urlSuffix,
      this.dateFrom,
      this.daysToRequest,
      EAggregation.DAYS,
      this.requestPayload
    );

    this.data$.pipe(
      take(1),
    ).subscribe(timeBuckets => {

      this.valuesStress = this.getValues(
        timeBuckets.map(x => x.data.user),
        this.multipleOptions,
        ECategory.STRESS,
        this.filterByOption,
      );

      this.valuesMood = this.getValues(
        timeBuckets.map(x => x.data.user),
        this.multipleOptions,
        ECategory.MOOD,
        this.filterByOption,
      );

      this.valuesSleep = this.getValues(
        timeBuckets.map(x => x.data.user),
        this.multipleOptions,
        ECategory.SLEEP,
        this.filterByOption,
      );

      if (this.comparisonActive) {
        this.valuesStress = this.getValues(
          timeBuckets.map(x => x.data.compare),
          this.multipleOptions,
          ECategory.STRESS,
          this.filterByOption,
        );
  
        this.valuesMood = this.getValues(
          timeBuckets.map(x => x.data.compare),
          this.multipleOptions,
          ECategory.MOOD,
          this.filterByOption,
        );
  
        this.valuesSleep = this.getValues(
          timeBuckets.map(x => x.data.compare),
          this.multipleOptions,
          ECategory.SLEEP,
          this.filterByOption,
        );
      }

      this.selectCategory(ECategory.STRESS);

      if (this.multipleOptions) {
        this.uniqueOptions = this.getUniqueOptions(timeBuckets);
      }
    });
  }

  ngAfterViewInit(): void {
    this.data$.pipe(
      take(1),
    ).subscribe(timeBuckets => {
      if (this.multipleOptions) {
        this.uniqueOptions = this.getUniqueOptions(timeBuckets);
      }
    });
  }

  selectCategory(category: ECategory): void {
    this.selectedCategory = category;

    if (category === ECategory.STRESS) {
      this.values1 = this.valuesStress;
      this.values2 = this.valuesStressCompare;
      this.textY = 'Stresslevel';
    }
    if (category === ECategory.MOOD) {
      this.values1 = this.valuesMood;
      this.values2 = this.valuesMoodCompare;
      this.textY = 'Gefühlszustand';
    }
    if (category === ECategory.SLEEP) {
      this.values1 = this.valuesSleep;
      this.values2 = this.valuesSleepCompare;
      this.textY = 'Schlafqualität';
    }
  }

  onSelectionChange() {

  }

  getValues(correlations: ICorrelation[], multipleOptions: boolean, category: ECategory, filter: string) {
    return correlations.map(correlation => {
      let x = correlation.option;

      if (multipleOptions && filter === '') {
        x = correlation.options[0] ? correlation.options[0].value : null;
      }

      if (multipleOptions && filter) {
        const optionsFiltered = correlation.options.filter(x => x.name === filter);
        x = optionsFiltered[0] ? optionsFiltered[0].value : null;
      }

      switch (category) {
        case ECategory.STRESS:
          return { x, y: correlation.stress };
        case ECategory.MOOD:
          return { x, y: correlation.mood };
        case ECategory.SLEEP:
          return { x, y: correlation.sleep };
      }
    });
  }

  private getUniqueOptions(timeBuckets: ITimeBucket<IBasicResponse<ICorrelation>>[]): string[] {
    if (this.multipleOptions) {
      const allOptions: string[][] = timeBuckets
        .map(correlation => correlation.data.user.options.map(option => option.name),
      );

      return this.getUniqueStrings(_.flatten(allOptions));
    }
  }

  private getUniqueStrings(strings: string[]): string[] {
    const set = new Set<string>();
    strings.forEach(s => {
      set.add(s);
    });
    return Array.from(set);
  }

}
