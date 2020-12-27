import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IStatisticItem } from '@shared/types/server';
import { ColorService, EColor } from '../../../utils/color.service';
import { EColorStyle } from '../../charts';
import { GenericChartComponent } from '../generic-chart/generic-chart.component';

@Component({
  selector: 'app-generic-pie',
  templateUrl: './generic-pie.component.html',
  styleUrls: ['./generic-pie.component.scss'],
})
export class GenericPieComponent extends GenericChartComponent implements OnChanges {

  @Input() data1: IStatisticItem[];
  @Input() data2: IStatisticItem[];
  @Input() chartTitle1: string;
  @Input() chartTitle2: string;
  @Input() colorStyle: EColorStyle;
  @Input() duplicateWhenCompare = true;

  chartColors1: EColor[];
  chartColors2: EColor[];

  chartLabels1: string[];
  chartLabels2: string[];

  chartValues1: number[];
  chartValues2: number[];

  chartValues1IsEmpty: boolean;
  chartValues2IsEmpty: boolean;

  increaseWidthPieChart: boolean;

  constructor(
    private colorService: ColorService,
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.data1 || changes.data2) && this.data1) {
      const sortedItems1: IStatisticItem[] = [...this.data1].sort((a, b) => b.value - a.value);
      this.chartLabels1 = sortedItems1.map(x => x.option);
      this.chartValues1 = sortedItems1.map(x => x.value);
      this.chartValues1IsEmpty = this.chartValues1.every(x => x < 1);

      if (this.colorStyle === EColorStyle.ASCENDING) {
        this.chartColors1 = sortedItems1.map(x => this.colorService.getColorForPositivity(x.positivity));
      }

      // When there are too many labels the chart itself will decrease in size.
      // Therefore we increase its width.
      this.increaseWidthPieChart = this.chartValues1.length > 10;

      if (!this.data2) {
        return;
      }

      const sortedItems2: IStatisticItem[] = [...this.data2].sort((a, b) => b.value - a.value);
      this.chartLabels2 = sortedItems2.map(x => x.option);
      this.chartValues2 = sortedItems2.map(x => x.value);
      this.chartValues2IsEmpty = this.chartValues2.every(x => x < 1);

      if (this.colorStyle === EColorStyle.ASCENDING) {
        this.chartColors2 = sortedItems2.map(x => this.colorService.getColorForPositivity(x.positivity));
      }
    }
  }
}