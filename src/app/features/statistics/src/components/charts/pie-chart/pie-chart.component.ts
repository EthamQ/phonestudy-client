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

  @Input() title: string;
  @Input() labels: string[];
  @Input() values1: number[];
  @Input() colors: EColor[];

  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartOptions: ChartOptions;
  datasets: ChartDataSets[] = [];

  ngOnChanges(): void {
    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 10,
      title: {
        text: this.title,
        display: !!this.title,
      }
    };

    if(this.colors && this.colors.length > 0) {
      this.datasets = [
        {
          data: this.values1,
          backgroundColor: this.colors,
        }
      ];
    } else {
      this.datasets = [
        {
          data: this.values1,
        }
      ];
    }
  }


}
