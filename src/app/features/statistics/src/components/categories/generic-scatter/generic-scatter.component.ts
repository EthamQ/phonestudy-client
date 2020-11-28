import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { IBasicResponse, ICorrelation, IRequestPayload, ITimeBucket } from '@shared/types/server';
import { ChartPoint } from 'chart.js';
import { Observable } from 'rxjs';
import { EAggregation, StatisticsDataAccessService } from '../../../data-access/services/statistics-data-access.service';
import * as _ from 'underscore';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-generic-scatter',
  templateUrl: './generic-scatter.component.html',
  styleUrls: ['./generic-scatter.component.scss']
})
export class GenericScatterComponent implements OnInit {

  daysToRequest = 14;
  categories: ECategory[];
  selectedCategory: ECategory;
  comparisonActive: boolean;
  multipleOptions: boolean;
  dateFrom: string;
  dateTo: string;
  urlSuffix: string;
  requestPayload: IRequestPayload;

  data$: Observable<ITimeBucket<IBasicResponse<ICorrelation>>[]>;

  textX = '';
  textY = '';

  chartPointsUser: ChartPoint[];
  chartPointsCompare: ChartPoint[];

  uniqueOptions: string[] = [];
  activeUniqueOptions: string[] = [];
  selectedOptionDropdown = '';

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

      if (this.multipleOptions) {
        this.uniqueOptions = this.getUniqueOptions(timeBuckets);
        // By default the first option is preselected
        this.selectedOptionDropdown = this.uniqueOptions[0];
      }

      this.setChartpoints(timeBuckets, ECategory.STRESS, this.selectedOptionDropdown);
    });
  }

  /**
   * Updates the x and y values for the currently selected @param category and the option @param filter
   */
  setChartpoints(timeBuckets: ITimeBucket<IBasicResponse<ICorrelation>>[], category: ECategory, filter: string): void {
    // Remove all options from the dropdown that don't have a x and y value fpr this category
    this.activeUniqueOptions = this.getNonEmptyOptions(timeBuckets, category, this.uniqueOptions);

    this.selectedCategory = category;

    this.chartPointsUser = this.getChartpoints(
      timeBuckets.map(x => x.data.user),
      this.multipleOptions,
      category,
      filter,
    );

    if (this.comparisonActive) {
      this.chartPointsCompare = this.getChartpoints(
        timeBuckets.map(x => x.data.compare),
        this.multipleOptions,
        category,
        filter,
      );
    }

    this.textY = this.getDisplayName(category);
  }

  onDropdownChange(timeBuckets: ITimeBucket<IBasicResponse<ICorrelation>>[], selectedOption: string): void {
    this.selectedOptionDropdown = selectedOption;

    this.chartPointsUser = this.getChartpoints(
      timeBuckets.map(x => x.data.user),
      this.multipleOptions,
      this.selectedCategory,
      selectedOption,
    );
  }

  getChartpoints(correlations: ICorrelation[], multipleOptions: boolean, category: ECategory, filter: string): ChartPoint[] {
    return correlations.map(correlation => {
      let x = correlation.option;

      if (multipleOptions) {
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

  private getNonEmptyOptions(timeBuckets: ITimeBucket<IBasicResponse<ICorrelation>>[], category: ECategory, options: string[]) {
    let emptyOptions: string[] = [];

    options.forEach(option => {
      const chartPoints: ChartPoint[] = this.getChartpoints(
        timeBuckets.map(x => x.data.user),
        this.multipleOptions,
        category,
        option,
      );

      const chartPointsEmpty = chartPoints.every(point => (!point.x || !point.y));

      if(chartPointsEmpty) {
        emptyOptions.push(option);
      }
    });

    return this.uniqueOptions.filter(x => !emptyOptions.includes(x));
  }

  private getDisplayName(category: ECategory) {
    switch (category) {
      case ECategory.STRESS:
        return 'Stresslevel';
      case ECategory.MOOD:
        return 'Gefühlszustand';
      case ECategory.SLEEP:
        return 'Schlafqualität';
    }
  }

}
