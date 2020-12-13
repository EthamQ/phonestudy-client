import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { EColor } from '../../../utils/color.service';

export enum EColorStyle {
  ASCENDING,
  RANDOM,
}

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnChanges {

  @Input() labels: string[];
  @Input() values1: number[];
  @Input() values2: number[];
  @Input() colors: EColor[];

  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 10,
  };
  datasets: ChartDataSets[] = [];

  ngOnChanges(): void {
    console.log(this.values1);
    this.datasets = [
      this.getDataSets(this.values1, this.colors),
    ];

    if(this.values2) {
      this.datasets.push(this.getDataSets(this.values2, this.colors));
    }
  }

  getDataSets(values: number[], colors: string[]): ChartDataSets {
    if(colors && colors.length > 0) {
      return {
        data: values,
        backgroundColor: colors,
      }
    }

    return { data: values };
  }

}
