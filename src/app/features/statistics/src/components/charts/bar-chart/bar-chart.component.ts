import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Component, OnChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent implements OnChanges {

  @Input() options: string[];
  @Input() values: number[];
  @Input() values2: number[];
  @Input() textY: string;

  datasets: ChartDataSets[];
  pieChartType: ChartType = 'bar';
  pieChartLegend = true;
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          suggestedMin: 0,
          suggestedMax: 6,
        }
      }]
    },
  };

  ngOnChanges(): void {
    this.datasets = [{ data: this.values, backgroundColor: '#07c' }];

    if(this.values2 && this.values2.length > 0) {
      this.datasets.push({ data: this.values2, backgroundColor: 'orange' });
    }

    this.chartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            suggestedMin: 0,
            suggestedMax: 6,
          },
          scaleLabel: {
            display: true,
            labelString: this.textY,
          },
        }]
      },
    };
  }

}
