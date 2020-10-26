import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';

@Component({
  selector: 'app-mood-pie',
  templateUrl: './mood-pie.component.html',
  styleUrls: ['./mood-pie.component.scss']
})
export class MoodPieComponent {

// Pie
public pieChartOptions: ChartOptions = {
  responsive: true,

};
// public pieChartLabels: Label[] = ['sehr angenehm', 'angenehm', 'unangenehm', 'eher unangenehm'];
// public pieChartLabels: Label[] = ['entspannt', 'eher entspannt', 'eher gestresst', 'sehr gestresst'];
public pieChartLabels: Label[] = ['sehr gut', 'gut', 'eher schlecht', 'sehr schlecht'];

// public pieChartData: SingleDataSet = [15, 10, 8, 4];
public pieChartType: ChartType = 'pie';         
public pieChartLegend = true;
public pieChartPlugins = [];              

datasets: any[] = [

  {   data: [15, 10, 8, 4].reverse(), backgroundColor: ['green', '#008000a1', '#ff00008f', 'red'], indexLabelPlacement: "inside", },
];




constructor() {
  monkeyPatchChartJsTooltip(); 
  monkeyPatchChartJsLegend();
}
}
