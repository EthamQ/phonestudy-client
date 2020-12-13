import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { IBasicResponse, ICorrelation, ITimeBucket } from '@shared/types/server';
import { ChartPoint } from 'chart.js';
import { Observable } from 'rxjs';
import { EAggregation, StatisticsDataAccessService } from '../../../data-access/services/statistics-data-access.service';
import * as _ from 'underscore';
import { map, take } from 'rxjs/operators';
import { GenericChartComponent } from '../generic-chart/generic-chart.component';
import { CorrelationCalculationService } from '../../../utils/correlation-calculation.service';
import { EDataOrigin } from '../../../types/types';
import { ColorService } from '../../../utils/color.service';

@Component({
  selector: 'app-generic-scatter',
  template: '',
})
export class GenericScatterComponent extends GenericChartComponent implements OnInit {

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
  colorCompare = this.colorService.getChartColor(EDataOrigin.COMPARE);

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
  ) {
    super();
  }

  ngOnInit(): void {
    this.dateFrom = '2020-04-01';
    this.dateTo = this.dateService.addDays(this.dateFrom, this.daysToRequest);

    this.data$ = this.statisticsDataAccessService.getCorrelation(
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

      this.setChartpoints(ECategory.STRESS, this.selectedOptionDropdown);

      this.setPearsonCorrelation(EDataOrigin.USER);
    });
  }

  setChartpoints(category: ECategory, filter: string): void {
    this.descriptionCorrelation = `${this.description} ${this.getDisplayName(category)}`;

    this.selectedCategory = category;

    console.log('setChartpoints', category, filter);

    this.chartPointsUser = this.getChartpoints(
      this.dataUser,
      category,
      filter,
    );

    this.chartPointsCompare = this.comparisonActive ? this.getChartpoints(
      this.dataCompare,
      category,
      filter,
    ) : null;

    this.textY = this.getDisplayName(category);
    this.setPearsonCorrelation(EDataOrigin.USER);
    if(this.comparisonActive) {
      this.setPearsonCorrelation(EDataOrigin.COMPARE);
    }
  }

  onDropdownChange(selectedOption: string): void {
    this.selectedOptionDropdown = selectedOption;
    this.setChartpoints(this.selectedCategory, selectedOption);
  }

  private getChartpoints(correlation: ICorrelation, category: ECategory, filter: string): ChartPoint[] {
    switch (category) { 
      case ECategory.STRESS:
        return correlation.stress.filter(x => filter ? x.name === filter : true).map(c => ({ x: c.x, y: c.y }));
      case ECategory.MOOD:
        return correlation.mood.filter(x => filter ? x.name === filter : true).map(c => ({ x: c.x, y: c.y }));
      case ECategory.SLEEP:
        return correlation.sleep.filter(x => filter ? x.name === filter : true).map(c => ({ x: c.x, y: c.y }));
    }
  }

  private getUniqueOptions(correlation: ICorrelation, category: ECategory): string[] {
    switch (category) { 
      case ECategory.STRESS:
        return this.getUniqueStrings(correlation.stress.map(x => x.name));
      case ECategory.MOOD:
        return this.getUniqueStrings(correlation.mood.map(x => x.name));
      case ECategory.SLEEP:
        return this.getUniqueStrings(correlation.sleep.map(x => x.name));
    }
  }

  private getUniqueStrings(strings: string[]): string[] {
    const set = new Set<string>();
    strings.forEach(s => {
      set.add(s);
    });
    return Array.from(set);
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

    const pearsonCorrelation: number = this.correlationCalculationService.getPearsonCorrelation(
      x,
      y,
    ) || 0;

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
