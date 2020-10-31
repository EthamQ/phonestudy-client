import { Component } from '@angular/core';
import { ECategory, IRange } from '@shared/types';
import { EColorStyle } from '../../charts/pie-chart/pie-chart.component';

@Component({
  selector: 'app-mood-pie',
  templateUrl: './mood-pie.component.html',
  styleUrls: ['./mood-pie.component.scss']
})
export class MoodPieComponent {

  category = ECategory.MOOD;

  colorStyle = EColorStyle.DESCENDING;

  dateRange: IRange<string> = {
    from: '12.07.2020',
    to: '16.07.2020',
  }

  options = [
    'sehr angenehm',
    'angenehm',
    'eher angenehm',
    'eher unangenehm',
    'unangenehm',
    'sehr unangenehm'
  ];

  values1 = [3, 4, 1, 2, 5, 6];

  values2 = undefined;


}
