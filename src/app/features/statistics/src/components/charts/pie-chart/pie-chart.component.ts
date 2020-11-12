import { Component, Input, OnInit } from '@angular/core';
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
export class PieChartComponent implements OnInit {

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
  };
  datasets: ChartDataSets[] = [];

  ngOnInit() {
    if(this.colorStyle === EColorStyle.DESCENDING) {
      if (this.values2) {
        this.datasets = [
          {
            data: this.values1,
            backgroundColor: this.colorsDescending,
          },
          {
            data: this.values2,
            backgroundColor: this.colorsDescending,
          },
        ]
      } else {
        this.datasets = [
          {
            data: this.values1,
            backgroundColor: this.colorsDescending,
          },
        ]
      }
    }

    else {
      if (this.values2) {
        this.datasets = [
          {
            data: this.values1,
          },
          {
            data: this.values2,
          },
        ]
      } else {
        this.datasets = [
          {
            data: this.values1,
          },
        ]
      }
    }



  }

  getColors(): string[] {
    switch(this.colorStyle) {
      case EColorStyle.DESCENDING: 
        return this.colorsDescending;
      default:
        return undefined;
    }
  }


}
