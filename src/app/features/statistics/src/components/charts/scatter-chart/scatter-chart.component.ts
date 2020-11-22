import { Component, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartDataSets, ChartType, ChartPoint } from 'chart.js';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss']
})
export class ScatterChartComponent implements OnChanges {

  @Input() values1: ChartPoint[];
  @Input() values2: ChartPoint[];

  @Input() textX: string;
  @Input() textY: string;

  chartType: ChartType = 'scatter';
  datasets: ChartDataSets[];
  options: ChartOptions;

  ngOnChanges(): void {
    console.log('values1', this.values1);
    console.log('values2', this.values2);
    if(this.values1) {
      this.datasets = [
        {
          data: this.values1,
          pointRadius: 10,
          pointBackgroundColor: 'red',
        },
      ];
    }

    if(this.values2 && this.datasets && this.datasets.length === 1) {
      this.datasets.push({
        data: this.values2.map(point => ({ x: point.x ? (<number>point.x + 1) : point.x, y: point.y ? (<number>point.y + 1): point.y})),
        pointRadius: 10,
        pointBackgroundColor: 'blue',
      });
    }

    this.options = {
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.textX,
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 30,
          },
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.textY,
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 6,
          },
        }]
      }
    };
  }

}
