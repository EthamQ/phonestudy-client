import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective, Label, Color } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-music-mood-graph',
  templateUrl: './music-mood-line.component.html',
  styleUrls: ['./music-mood-line.component.scss']
})
export class MusicMoodLineComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: false }) baseChartDirective: BaseChartDirective;

  inlinePlugin: any;
  textPlugin: any;

  datasets: ChartDataSets[] = [
    { data: [5, 5, 6, 7, 8, 5, 4], label: 'Gefühlszustand' },
  ];

  labels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
    xAxes: [{
      scaleLabel: {
         display: true,
         labelString: 'Zeit (22.1.2019 - 4.5.2019)'
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


  colors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#97D2FF',
    },
  ];
  
  legend = true;
  chartType = 'line';
  plugins = [];

  constructor() { }

  ngOnInit() {

    const this_ = this;
    this.textPlugin = [{                           
      id: 'text',
      afterDatasetsDraw(chart: Chart): any {
        const ctx: CanvasRenderingContext2D = chart.ctx;        

        const xaxis = (<any>chart).scales['x-axis-0'];
        const yaxis = (<any>chart).scales['y-axis-0'];


        chart.ctx.save(); 
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.ellipse(
          xaxis.getPixelForValue(this_.labels[3]),
          yaxis.getPixelForValue(this_.datasets[0].data[3]),
          20,
          20,
          Math.PI / 4,
          0,
          2 * Math.PI,
        );
        ctx.fill();

        ctx.font = '20px serif';
        ctx.fillStyle = 'white';
        ctx.fillText(
          '7',
          xaxis.getPixelForValue(this_.labels[3]) - 5,
          yaxis.getPixelForValue(this_.datasets[0].data[3])
        );
        chart.ctx.restore();  

        chart.ctx.save(); 
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.ellipse(
          xaxis.getPixelForValue(this_.labels[1]),
          yaxis.getPixelForValue(this_.datasets[0].data[1]),
          20,
          20,
          Math.PI / 4,
          0,
          2 * Math.PI,
        );
        ctx.fill();

        ctx.font = '20px serif';
        ctx.fillStyle = 'white';
        ctx.fillText(
          '8',
          xaxis.getPixelForValue(this_.labels[1]) - 5,
          yaxis.getPixelForValue(this_.datasets[0].data[1])
        );
        chart.ctx.restore(); 


        chart.ctx.save(); 
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.ellipse(
          xaxis.getPixelForValue(this_.labels[2]),
          yaxis.getPixelForValue(this_.datasets[0].data[2]),
          30,
          30,
          Math.PI / 4,
          0,
          2 * Math.PI,
        );
        ctx.fill();

        ctx.font = '20px serif';
        ctx.fillStyle = 'white';
        ctx.fillText(
          '10',
          xaxis.getPixelForValue(this_.labels[2]) - 10,
          yaxis.getPixelForValue(this_.datasets[0].data[2])
        );
        chart.ctx.restore();    
      },
    }];

    this.inlinePlugin = this.textPlugin;
  }

  ngAfterViewInit() {
  }

  onClick(e) {
    console.log(e);
  }
}
