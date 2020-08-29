import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';

@Component({
  selector: 'app-music-mood-scatter',
  templateUrl: './music-mood-scatter.component.html',
  styleUrls: ['./music-mood-scatter.component.scss']
})
export class MusicMoodScatterComponent implements OnInit {

  public scatterChartOptions: ChartOptions = {
    responsive: true,
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

  constructor() { }

  ngOnInit() {
  }
}
