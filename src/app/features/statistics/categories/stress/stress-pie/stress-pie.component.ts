import { Component } from '@angular/core';
import { ECategory, IRange } from '@shared/types';
import { EColorStyle } from '../../charts/pie-chart/pie-chart.component';

@Component({
  selector: 'app-stress-pie',
  templateUrl: './stress-pie.component.html',
  styleUrls: ['./stress-pie.component.scss']
})
export class StressPieComponent {

  category = ECategory.STRESS;

  colorStyle = EColorStyle.DESCENDING;

  dateRange: IRange<string> = {
    from: '12.07.2020',
    to: '16.07.2020',
  }

  options = [
    'sehr entspannt',
    'entspannt',
    'eher entspannt',
    'eher gestresst',
    'gestresst',
    'sehr gestresst'
  ];

  values1 = [3, 4, 1, 2, 5 ,6];

  values2 = undefined;

}
