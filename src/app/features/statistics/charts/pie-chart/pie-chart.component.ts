import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() options: string[];
  @Input() values1: number[];
  @Input() values2: number[];
  @Input() color: 'descending' | 'random';


  pieChartType: ChartType = 'pie';  
  pieChartLegend = true;  
  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  datasets: ChartDataSets[] = [];

  ngOnInit() {
    if(this.values2) {
      this.datasets = [
        {
          data: this.values1,
          backgroundColor: this.getColors(),
        },
        {
          data: this.values2,
          backgroundColor: this.getColors(),
        },
      ]
    } else {
      this.datasets = [
        {
          data: this.values1,
          backgroundColor: this.getColors(),
        },
      ]
    }
  }

  getColors(): string[] {
    return ['green', '#008000a1', '#ff00008f', 'red'];
  }


}
