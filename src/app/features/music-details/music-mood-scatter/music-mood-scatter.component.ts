import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { CorrelationCalculationService } from 'src/app/services/correlation-calculation.service';


@Component({
  selector: 'app-music-mood-scatter',
  templateUrl: './music-mood-scatter.component.html',
  styleUrls: ['./music-mood-scatter.component.scss']
})
export class MusicMoodScatterComponent implements OnInit {

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
         labelString: 'Häufigkeit Interpret angehört'
      }
   }],
    yAxes: [{
       scaleLabel: {
          display: true,
          labelString: 'Gefühlszustand'
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
    pointBackgroundColor: 'blue',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#ff0000'
  }];


  constructor(private correlationCalculationService: CorrelationCalculationService) { }

  ngOnInit() {
    const x = [1, 7, 6, 2, 3, 3, 3, 4, 3, 0];
    const y = [3, 7, 6, 4, 3, 4, 5, 4, 1, 0];
    this.scatterChartData[0].data = x.map((x, i) => ({ x, y: y[i]}));
    console.log('Correlation', this.correlationCalculationService.getPearsonCorrelation(x, y));
  }
}
