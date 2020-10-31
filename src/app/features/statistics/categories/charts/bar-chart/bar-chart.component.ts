import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  readonly labels: Label[] = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  constructor() { }

  ngOnInit(): void {
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
          suggestedMax: 10,
        }
      }]
    },
  };


  public pieChartData: SingleDataSet = [4, 5, 8, 3, 2, 7, 8].reverse();
  public pieChartType: ChartType = 'bar';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  datasets: ChartDataSets[] = [
    { backgroundColor: '#07c' },
  ];



}
