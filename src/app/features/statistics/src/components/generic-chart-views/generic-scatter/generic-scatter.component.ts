import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { IBasicResponse, ICoordinate, ICorrelation, IRequestPayloadScatter, ITimeBucket } from '@shared/types/server';
import { ChartPoint } from 'chart.js';
import { Observable } from 'rxjs';
import { EAggregation, StatisticsDataAccessService } from '../../../data-access/services/statistics-data-access.service';
import * as _ from 'underscore';
import { take } from 'rxjs/operators';
import { GenericChartComponent } from '../generic-chart/generic-chart.component';
import { CorrelationCalculationService } from '../../../utils/correlation-calculation.service';
import { EDataOrigin } from '../../../types/types';
import { ColorService } from '../../../utils/color.service';
import { StringService } from '../../../utils/string.service';
import { CategoryService } from '../../../utils/category.service';

@Component({
  selector: 'app-generic-scatter',
  template: '',
})
export class GenericScatterComponent extends GenericChartComponent<IRequestPayloadScatter> implements OnInit {

  daysToRequest = 200;
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
  colorCompare: string = this.colorService.getChartColor(EDataOrigin.COMPARE);

  data$: Observable<ITimeBucket<IBasicResponse<ICorrelation>>[]>;
  dataUser: ICorrelation;
  dataCompare: ICorrelation;

  textX = '';
  textY = '';

  chartPointsUser: ChartPoint[];
  chartPointsCompare: ChartPoint[];

  dropdownOptions: string[] = [];
  activeUniqueOptions: string[] = [];
  selectedOptionDropdown = '';

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
    private correlationCalculationService: CorrelationCalculationService,
    private colorService: ColorService,
    private stringService: StringService,
    private categoryService: CategoryService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.dateFrom = '2020-04-01';
    this.dateTo = this.dateService.addDays(this.dateFrom, this.daysToRequest);

    this.data$ = this.statisticsDataAccessService.getScatterChartData(
      this.urlSuffix,
      this.dateFrom,
      this.daysToRequest,
      EAggregation.NO_AGGREGATION,
      this.requestPayload
    );

    this.data$.pipe(
      take(1),
    ).subscribe(timeBuckets => {
      this.dataUser = timeBuckets[0].data.user;
      this.dataCompare = timeBuckets[0].data.compare;

      if (this.multipleOptions) {
        // By default the first option is preselected
        this.dropdownOptions = this.getUniqueOptions(this.dataUser, ECategory.STRESS);
        this.selectedOptionDropdown = this.dropdownOptions[0];
      }

      this.updateChartAndCorrelation(ECategory.STRESS, this.selectedOptionDropdown);

      this.setPearsonCorrelation(EDataOrigin.USER);
    });
  }

  updateChartAndCorrelation(category: ECategory, filter: string): void {
    console.log('updateChartAndCorrelation', category, filter);
    this.descriptionCorrelation = `${this.description} ${this.categoryService.getDisplayName(category)}`;

    this.selectedCategory = category;

    this.textY = this.categoryService.getDisplayName(category);

    this.chartPointsUser = this.getCorrelationAsChartpoints(
      this.dataUser,
      category,
      filter,
    );

    this.chartPointsCompare = this.comparisonActive ? this.getCorrelationAsChartpoints(
      this.dataCompare,
      category,
      filter,
    ) : null;

    if(this.comparisonActive) {
      this.setPearsonCorrelation(EDataOrigin.USER);
      this.setPearsonCorrelation(EDataOrigin.COMPARE);
    } else {
      this.setPearsonCorrelation(EDataOrigin.USER);
    }
  }

  onDropdownChange(selectedOption: string): void {
    this.selectedOptionDropdown = selectedOption;
    this.updateChartAndCorrelation(this.selectedCategory, selectedOption);
  }

  private getCorrelationAsChartpoints(correlation: ICorrelation, category: ECategory, filter: string): ChartPoint[] {
    return this.getCoordinates(correlation, category)
      .filter(c => filter ? c.name === filter : true)
      .map(c => ({ x: c.x, y: c.y }));
  }

  private getUniqueOptions(correlation: ICorrelation, category: ECategory): string[] {
    return this.stringService.getUniqueStrings(
      this.getCoordinates(correlation, category).map(x => x.name),
    );
  }

  private getCoordinates(correlation: ICorrelation, category: ECategory): ICoordinate[] {    
    switch (category) { 
      case ECategory.STRESS:
        return correlation.stress;
      case ECategory.MOOD:
        return correlation.mood;
      case ECategory.SLEEP:
        return correlation.sleep;
    }
  }

  private setPearsonCorrelation(origin: EDataOrigin): void {
    const x: number[] = this.getChartpoints(origin).map(point => point.x) as number[];
    const y: number[] = this.getChartpoints(origin).map(point => point.y) as number[];

    const pearsonCorrelation: number = this.correlationCalculationService.getPearsonCorrelation(
      x,
      y,
    ) || 0;

    const pearsonCorrelationRounded: number = Math.round(pearsonCorrelation * 100) / 100;
    this.setCorrelationValue(origin, pearsonCorrelationRounded);

    let title = 'Keine Korrelation';
    if(pearsonCorrelationRounded > 0) {
      title = 'Positive Korrelation';
    }
    if(pearsonCorrelationRounded < 0) {
      title = 'Negative Korrelation';
    }

    this.setCorrelationTitle(origin, title);

    const explanation: string = this.getCorrelationExplanation(
      this.categories[0],
      this.selectedCategory,
      this.pearsonCorrelationUser,
    );

    this.setCorrelationExplanation(origin, explanation);
  }

  private getCorrelationExplanation(category1: ECategory, category2: ECategory, pearsonCorrelation: number): string {    
    let explanation: string;
    const nameCorrelatedCategory: string = this.categoryService.getDisplayName(category2);

    if (pearsonCorrelation === 0) {
      return '';
    }

    switch (category1) {
      case ECategory.COMMUNICATION:
        if (pearsonCorrelation > 0) {
          explanation = `Desto mehr du telefoniert hast desto höher / besser war dein(e) ${nameCorrelatedCategory}`;
        }
        if (pearsonCorrelation < 0) {
          explanation = `Desto mehr du telefoniert hast desto niedriger / schlechter war dein(e) ${nameCorrelatedCategory}`;
        }
        break;
      case ECategory.APP:
        if (pearsonCorrelation >= 0) {
          explanation = `Desto mehr du ${this.selectedOptionDropdown} verwendet hast desto höher / besser war dein(e) ${nameCorrelatedCategory}`;
        }
        if (pearsonCorrelation < 0) {
          explanation = `Desto mehr du ${this.selectedOptionDropdown} verwendet hast desto niedriger / schlechter war dein(e) ${nameCorrelatedCategory}`;
        }
        break;
    }

    return `${explanation} und umgekehrt`;
  }

  private setCorrelationTitle(origin: EDataOrigin, value: string): void {
    if(origin === EDataOrigin.USER) {
      this.pearsonCorrelationTitleUser = value;
    }
    if(origin === EDataOrigin.COMPARE) {
      this.pearsonCorrelationTitleCompare = value;
    }
  }

  private setCorrelationExplanation(origin: EDataOrigin, value: string): void {
    if(origin === EDataOrigin.USER) {
      this.pearsonCorrelationExplanationUser = value;
    }
    if(origin === EDataOrigin.COMPARE) {
      this.pearsonCorrelationExplanationCompare = value;
    }
  }

  private setCorrelationValue(origin: EDataOrigin, value: number): void {
    if(origin === EDataOrigin.USER) {
      this.pearsonCorrelationUser = value;
    }
    if(origin === EDataOrigin.COMPARE) {
      this.pearsonCorrelationCompare = value;
    }
  }

  private getChartpoints(origin: EDataOrigin): ChartPoint[] {
    if(origin === EDataOrigin.USER) {
      return this.chartPointsUser;
    }
    if(origin === EDataOrigin.COMPARE) {
      return this.chartPointsCompare;
    }
  }

}
