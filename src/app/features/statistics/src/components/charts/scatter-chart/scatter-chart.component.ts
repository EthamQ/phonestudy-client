import { Component, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartDataSets, ChartType, ChartPoint } from 'chart.js';
import { EDataOrigin } from '../../../types/types';
import { ColorService } from '../../../utils/color.service';

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

  constructor(private colorService: ColorService) {}

  ngOnChanges(): void {
    console.log('values1', this.values1);
    console.log('values2', this.values2);
    if(this.values1) {
      this.datasets = [
        {
          data: this.values1,
          pointRadius: 10,
          pointBackgroundColor: this.colorService.getChartColor(EDataOrigin.USER),
        },
      ];
    }

    if(this.values2 && this.datasets && this.datasets.length === 1) {
      this.datasets.push({
        data: this.values2,
        pointRadius: 15,
        pointBackgroundColor: this.colorService.getChartColor(EDataOrigin.COMPARE),
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
