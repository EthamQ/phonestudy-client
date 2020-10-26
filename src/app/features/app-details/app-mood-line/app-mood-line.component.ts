import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective, Label, Color } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-app-mood-line',
  templateUrl: './app-mood-line.component.html',
  styleUrls: ['./app-mood-line.component.scss']
})
export class AppMoodLineComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: false }) baseChartDirective: BaseChartDirective;

  inlinePlugin: any;
  textPlugin: any;

  datasets: ChartDataSets[] = [
    { data: [7, 4, 4, 3, 5, 6, 7], label: 'Aktivitätslevel' },
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
          labelString: 'Aktivitätslevel'
       }
    }]
 }
  };


  colors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#B1EEA1',
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
        ctx.fillStyle = '#217C0A';
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
          '6',
          xaxis.getPixelForValue(this_.labels[3]) - 5,
          yaxis.getPixelForValue(this_.datasets[0].data[3])
        );
        chart.ctx.restore();  

        chart.ctx.save(); 
        ctx.fillStyle = '#217C0A';
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
          '7',
          xaxis.getPixelForValue(this_.labels[1]) - 5,
          yaxis.getPixelForValue(this_.datasets[0].data[1])
        );
        chart.ctx.restore(); 


        chart.ctx.save(); 
        ctx.fillStyle = '#217C0A';
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
          '9',
          xaxis.getPixelForValue(this_.labels[2]) - 10,
          yaxis.getPixelForValue(this_.datasets[0].data[2])
        );
        chart.ctx.restore();    
      },
    }];

    this.inlinePlugin = this.textPlugin;
  }

}
