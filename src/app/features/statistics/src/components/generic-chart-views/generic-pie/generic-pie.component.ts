import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IStatisticItem } from '@shared/types/server';
import { ColorService, EColor } from '../../../utils/color.service';
import { EColorStyle } from '../../charts';
import { GenericChartComponent } from '../generic-chart/generic-chart.component';

@Component({
  selector: 'app-generic-pie',
  templateUrl: './generic-pie.component.html',
  styleUrls: ['./generic-pie.component.scss']
})
export class GenericPieComponent extends GenericChartComponent implements OnChanges {

  @Input() data1: IStatisticItem[];
  @Input() data2: IStatisticItem[];
  @Input() colorStyle: EColorStyle;

  chartColors: EColor[];
  chartLables: string[];
  chartValues1: number[];
  chartValues2: number[];

  increaseWidthPieChart: boolean;

  constructor(
    private colorService: ColorService,
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.data1 || changes.data2) && this.data1) {
      const chartValues1SortedByValueASC: IStatisticItem[] = [...this.data1].sort((a, b) => a.value - b.value);

      // All have to be in the same order to be displayed correctly
      this.chartLables = chartValues1SortedByValueASC.map(x => x.option);
      this.chartValues1 = chartValues1SortedByValueASC.map(x => x.value);
      if (this.colorStyle === EColorStyle.ASCENDING) {
        this.chartColors = chartValues1SortedByValueASC.map(x => this.colorService.getColorForPositivity(x.positivity));
      }

      // When there are too many labels the chart itself will decrease in size.
      // Therefore we increase its width.
      this.increaseWidthPieChart = this.chartValues1.length > 10;

      if (!this.data2) {
        return;
      }

      // They need to have the same order as the other items for it to have the correct colors
      const values2SortedByValues1: IStatisticItem[] = this.data2.sort(
        (a, b) =>
          chartValues1SortedByValueASC.findIndex(x => x.option === a.option)
          - chartValues1SortedByValueASC.findIndex(x => x.option === b.option)
      );

      this.chartValues2 = values2SortedByValues1.map(x => x.value);
    }
  }
}