import { Component } from '@angular/core';
import { ECategory, IRange } from '@shared/types';

@Component({
  selector: 'app-stress-pie',
  templateUrl: './stress-pie.component.html',
  styleUrls: ['./stress-pie.component.scss']
})
export class StressPieComponent {

  category = ECategory.STRESS;

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
