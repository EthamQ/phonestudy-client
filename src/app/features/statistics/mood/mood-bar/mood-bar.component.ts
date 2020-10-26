import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';

@Component({
  selector: 'app-mood-bar',
  templateUrl: './mood-bar.component.html',
  styleUrls: ['./mood-bar.component.scss']
})
export class MoodBarComponent {
// Pie
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
public pieChartLabels: Label[] = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

public pieChartData: SingleDataSet = [4, 5, 8, 3, 2, 7, 8].reverse();
public pieChartType: ChartType = 'bar';
public pieChartLegend = true;
public pieChartPlugins = [];

datasets: ChartDataSets[] = [
  { backgroundColor: '#07c' },
];


constructor() {
  monkeyPatchChartJsTooltip(); 
  monkeyPatchChartJsLegend();
}

}
