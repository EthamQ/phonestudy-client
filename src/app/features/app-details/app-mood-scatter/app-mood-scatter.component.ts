import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { CorrelationCalculationService } from 'src/app/services/correlation-calculation.service';

@Component({
  selector: 'app-app-mood-scatter',
  templateUrl: './app-mood-scatter.component.html',
  styleUrls: ['./app-mood-scatter.component.scss']
})
export class AppMoodScatterComponent implements OnInit {

  public scatterChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false,
    },
    // maintainAspectRatio: false,
    scales: { //you're missing this
    xAxes: [{
      scaleLabel: {
         display: true,
         labelString: 'Häufigkeit App benutzt'
      }
   }],
    yAxes: [{
       scaleLabel: {
          display: true,
          labelString: 'Stresslevel'
       }
    }]
 }
  };


  public scatterChartData: ChartDataSets[] = [
    {
      data: [
        { x: 1, y: 1 },
        { x: 2, y: 3 },
        { x: 3, y: 4 },
        { x: 4, y: 7 },
        { x: 5, y: 12 },
      ],
      label: 'Series A',
      pointRadius: 10,
    },
  ];
  public scatterChartType: ChartType = 'scatter';

  public chartColors = [{
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    pointBackgroundColor: '#F4757D',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#ff0000'
  }];


  constructor(private correlationCalculationService: CorrelationCalculationService) { }

  ngOnInit() {
    const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10];
    const y = [7, 7, 8, 5, 6, 7, 4, 3, 2, 0];
    this.scatterChartData[0].data = x.map((x, i) => ({ x, y: y[i]}));
    console.log('Correlation', this.correlationCalculationService.getPearsonCorrelation(x, y));
  }

}
