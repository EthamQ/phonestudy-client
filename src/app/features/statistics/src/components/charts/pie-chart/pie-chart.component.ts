import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

export enum EColorStyle {
  DESCENDING,
  RANDOM,
}

export enum EColor {
  GREEN_DARK = '#0b6f0f',
  GREEN_MIDDLE = '#11aa17',
  GREEN_LIGHT = '#58da5d',
  RED_DARK = '#e81809',
  RED_MIDDLE = '#ec5348',
  RED_LIGHT = '#f27a72',
}

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnChanges {

  @Input() options: string[];
  @Input() values1: number[];
  @Input() values2: number[];
  @Input() colorStyle: EColorStyle;

  private readonly colorsDescending: string[] = [
    EColor.GREEN_DARK,
    EColor.GREEN_MIDDLE,
    EColor.GREEN_LIGHT,
    EColor.RED_LIGHT,
    EColor.RED_MIDDLE,
    EColor.RED_DARK,
  ];

  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 10,
  };
  datasets: ChartDataSets[] = [];

  ngOnChanges(): void {
    this.datasets = [
      this.getDataSets(this.values1, this.colorStyle),
    ];

    if(this.values2) {
      this.datasets.push(this.getDataSets(this.values2, this.colorStyle));
    }
  }

  getDataSets(data: number[], colorStyle: EColorStyle): ChartDataSets {
    if(colorStyle === EColorStyle.DESCENDING) {
      return {
        data,
        backgroundColor: this.colorsDescending,
      }
    }

    return { data };
  }

}
