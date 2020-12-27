import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ECategory } from '@shared/types';
import { ICoordinate, ICorrelation } from '@shared/types/server';
import { ChartPoint } from 'chart.js';
import * as _ from 'underscore';
import { GenericChartComponent } from '../generic-chart/generic-chart.component';
import { CorrelationCalculationService } from '../../../utils/correlation-calculation.service';
import { EDataOrigin } from '../../../types/types';
import { ColorService } from '../../../utils/color.service';
import { StringService } from '../../../utils/string.service';
import { CategoryService } from '../../../utils/category.service';

@Component({
  selector: 'app-generic-scatter',
  templateUrl: './generic-scatter.component.html',
  styleUrls: ['./generic-scatter.component.scss'],
})
export class GenericScatterComponent extends GenericChartComponent implements OnChanges {
  @Input() data1: ICorrelation;
  @Input() data2: ICorrelation;
  @Input() multipleOptions: boolean;
  @Input() categories: ECategory[];
  @Input() color1 = this.colorService.getChartColor(EDataOrigin.USER);
  @Input() color2 = this.colorService.getChartColor(EDataOrigin.COMPARE);
  @Input() textX: string;

  textY = '';
  dropdownOptions: string[] = [];
  activeUniqueOptions: string[] = [];
  selectedOptionDropdown = '';

  selectedCategory: ECategory;
  descriptionCorrelation: string;

  pearsonCorrelation1: number;
  pearsonCorrelation2: number;

  pearsonCorrelationTitle1: string;
  pearsonCorrelationTitle2: string;

  pearsonCorrelationExplanation1: string;
  pearsonCorrelationExplanation2: string;

  chartPoints1: ChartPoint[];
  chartPoints2: ChartPoint[];

  constructor(
    private correlationCalculationService: CorrelationCalculationService,
    private colorService: ColorService,
    private stringService: StringService,
    private categoryService: CategoryService,
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.data1 || changes.data2) && this.data1) {
      if (this.multipleOptions) {
        // By default the first option is preselected
        this.dropdownOptions = this.getUniqueOptions(this.data1, ECategory.STRESS);
        this.selectedOptionDropdown = this.dropdownOptions[0];
      }

      this.updateChartAndCorrelation(ECategory.STRESS, this.selectedOptionDropdown);

      this.setPearsonCorrelation(1);
    }
  }

  updateChartAndCorrelation(category: ECategory, filter: string): void {
    this.descriptionCorrelation = `${this.description} ${this.categoryService.getDisplayName(category)}`;

    this.selectedCategory = category;

    this.textY = this.categoryService.getDisplayName(category);

    this.chartPoints1 = this.getCorrelationAsChartpoints(
      this.data1,
      category,
      filter,
    );

    this.chartPoints2 = this.data2 ? this.getCorrelationAsChartpoints(
      this.data2,
      category,
      filter,
    ) : null;

    if (this.comparisonActive) {
      this.setPearsonCorrelation(1);
      this.setPearsonCorrelation(2);
    } else {
      this.setPearsonCorrelation(1);
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

  private setPearsonCorrelation(type: number): void {
    const x: number[] = this.getChartpoints(type).map(point => point.x) as number[];
    const y: number[] = this.getChartpoints(type).map(point => point.y) as number[];

    const pearsonCorrelation: number = this.correlationCalculationService.getPearsonCorrelation(
      x,
      y,
    ) || 0;

    const pearsonCorrelationRounded: number = Math.round(pearsonCorrelation * 100) / 100;
    this.setCorrelationValue(type, pearsonCorrelationRounded);

    let title = 'Keine Korrelation';
    if (pearsonCorrelationRounded > 0) {
      title = 'Positive Korrelation';
    }
    if (pearsonCorrelationRounded < 0) {
      title = 'Negative Korrelation';
    }

    this.setCorrelationTitle(type, title);

    const explanation: string = this.getCorrelationExplanation(
      this.categories[0],
      this.selectedCategory,
      this.pearsonCorrelation1,
    );

    this.setCorrelationExplanation(type, explanation);
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

  private setCorrelationTitle(type: number, value: string): void {
    if (type === 1) {
      this.pearsonCorrelationTitle1 = value;
    }
    if (type === 2) {
      this.pearsonCorrelationTitle2 = value;
    }
  }

  private setCorrelationExplanation(type: number, value: string): void {
    if (type === 1) {
      this.pearsonCorrelationExplanation1 = value;
    }
    if (type === 2) {
      this.pearsonCorrelationExplanation2 = value;
    }
  }

  private setCorrelationValue(type: number, value: number): void {
    if (type === 1) {
      this.pearsonCorrelation1 = value;
    }
    if (type === 2) {
      this.pearsonCorrelation2 = value;
    }
  }

  private getChartpoints(type: number): ChartPoint[] {
    if (type === 1) {
      return this.chartPoints1;
    }
    if (type === 2) {
      return this.chartPoints2;
    }
  }

}
