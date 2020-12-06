import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { IBasicResponse, ICorrelation, ITimeBucket } from '@shared/types/server';
import { ChartPoint } from 'chart.js';
import { Observable } from 'rxjs';
import { EAggregation, StatisticsDataAccessService } from '../../../data-access/services/statistics-data-access.service';
import * as _ from 'underscore';
import { take } from 'rxjs/operators';
import { GenericChartComponent } from '../generic-chart/generic-chart.component';
import { CorrelationCalculationService } from '../../../utils/correlation-calculation.service';
import { EDataOrigin } from '../../../types/types';
import { ColorService } from '../../../utils/color.service';

@Component({
  selector: 'app-generic-scatter',
  template: '',
})
export class GenericScatterComponent extends GenericChartComponent implements OnInit {

  daysToRequest = 14;
  categories: ECategory[];
  selectedCategory: ECategory;
  multipleOptions: boolean;
  descriptionCorrelation: string;

  pearsonCorrelationUser: number;
  pearsonCorrelationTitleUser: string;
  pearsonCorrelationExplanationUser: string;
  colorUser = this.colorService.getChartColor(EDataOrigin.USER);

  pearsonCorrelationCompare: number;
  pearsonCorrelationTitleCompare: string;
  pearsonCorrelationExplanationCompare: string;
  colorCompare = this.colorService.getChartColor(EDataOrigin.COMPARE);

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
    private correlationCalculationService: CorrelationCalculationService,
    private colorService: ColorService,
  ) {
    super();
  }

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
      console.log('timeBuckets', timeBuckets);

      if (this.multipleOptions) {
        this.uniqueOptions = this.getUniqueOptions(timeBuckets);
        // By default the first option is preselected
        this.selectedOptionDropdown = this.uniqueOptions[0];
      }

      this.setChartpoints(timeBuckets, ECategory.STRESS, this.selectedOptionDropdown);

      this.setPearsonCorrelation(EDataOrigin.USER);
    });
  }

  /**
   * Updates the x and y values for the currently selected @param category and the option @param filter
   */
  setChartpoints(timeBuckets: ITimeBucket<IBasicResponse<ICorrelation>>[], category: ECategory, filter: string): void {
    // Remove all options from the dropdown that don't have a x and y value fpr this category
    this.activeUniqueOptions = this.getNonEmptyOptions(timeBuckets, category, this.uniqueOptions);
    this.descriptionCorrelation = `${this.description} ${this.getDisplayName(category)}`;

    this.selectedCategory = category;

    this.chartPointsUser = this.getChartpoints(
      timeBuckets.map(x => x.data.user),
      this.multipleOptions,
      category,
      filter,
    );

    this.chartPointsCompare = this.comparisonActive ? this.getChartpoints(
      timeBuckets.map(x => x.data.compare),
      this.multipleOptions,
      category,
      filter,
    ) : null;

    this.textY = this.getDisplayName(category);
    this.setPearsonCorrelation(EDataOrigin.USER);
    if(this.comparisonActive) {
      this.setPearsonCorrelation(EDataOrigin.COMPARE);
    }
  }

  onDropdownChange(timeBuckets: ITimeBucket<IBasicResponse<ICorrelation>>[], selectedOption: string): void {
    this.selectedOptionDropdown = selectedOption;

    this.chartPointsUser = this.getChartpoints(
      timeBuckets.map(x => x.data.user),
      this.multipleOptions,
      this.selectedCategory,
      selectedOption,
    );

    this.chartPointsCompare = this.comparisonActive ? this.getChartpoints(
      timeBuckets.map(x => x.data.compare),
      this.multipleOptions,
      this.selectedCategory,
      selectedOption,
    ) : null;

    this.setPearsonCorrelation(EDataOrigin.USER);
    if(this.comparisonActive) {
      this.setPearsonCorrelation(EDataOrigin.COMPARE);
    }
  }

  private getChartpoints(correlations: ICorrelation[], multipleOptions: boolean, category: ECategory, filter: string): ChartPoint[] {
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

      if (chartPointsEmpty) {
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

  private setPearsonCorrelation(origin: EDataOrigin): void {
    const chartPoints = origin === EDataOrigin.USER ? this.chartPointsUser : this.chartPointsCompare;
    const title = origin === EDataOrigin.USER ? 'pearsonCorrelationTitleUser' : 'pearsonCorrelationTitleCompare';
    const explanation = origin === EDataOrigin.USER ? 'pearsonCorrelationExplanationUser' : 'pearsonCorrelationExplanationCompare';
    const correlationValue = origin === EDataOrigin.USER ? 'pearsonCorrelationUser' : 'pearsonCorrelationCompare';

    const x: number[] = chartPoints.map(point => point.x) as number[];
    const y: number[] = chartPoints.map(point => point.y) as number[];
    const xNonEmpty = [];
    const yNonEmpty = [];

    x.forEach((x, index) => {
      if (x !== null && y[index] !== null) {
        xNonEmpty.push(x);
        yNonEmpty.push(y[index]);
      }
    });

    const pearsonCorrelation: number = this.correlationCalculationService.getPearsonCorrelation(
      xNonEmpty,
      yNonEmpty,
    );

    this[correlationValue] = Math.round(pearsonCorrelation * 100) / 100;

    if (this.pearsonCorrelationUser === 0) {
      this[title] = 'Keine Korrelation';
    } else {
      this[title] = this.pearsonCorrelationUser >= 0 ? 'Positive Korrelation' : 'Negative Korrelation';
    }

    this[explanation] = this.getCorrelationExplanation(
      this.categories[0],
      this.selectedCategory,
      this.pearsonCorrelationUser,
    );
  }

  private getCorrelationExplanation(category1: ECategory, category2: ECategory, pearsonCorrelation: number): string {
    let explanation: string;
    const category2DisplayName = this.getDisplayName(category2);

    if (pearsonCorrelation === 0) {
      return '';
    }

    switch (category1) {
      case ECategory.COMMUNICATION:
        if (pearsonCorrelation > 0) {
          explanation = `Desto mehr du telefoniert hast desto höher / besser war dein(e) ${category2DisplayName}`;
        }
        if (pearsonCorrelation < 0) {
          explanation = `Desto mehr du telefoniert hast desto niedriger / schlechter war dein(e) ${category2DisplayName}`;
        }
        break;
      case ECategory.APP:
        if (pearsonCorrelation >= 0) {
          explanation = `Desto mehr du ${this.selectedOptionDropdown} verwendet hast desto höher / besser war dein(e) ${category2DisplayName}`;
        }
        if (pearsonCorrelation < 0) {
          explanation = `Desto mehr du ${this.selectedOptionDropdown} verwendet hast desto niedriger / schlechter war dein(e) ${category2DisplayName}`;
        }
        break;
    }

    return `${explanation} und umgekehrt`;
  }

}
