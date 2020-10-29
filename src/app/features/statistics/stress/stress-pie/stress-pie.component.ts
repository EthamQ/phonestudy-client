import { Component } from '@angular/core';
import { ECategory } from '@shared/types';

@Component({
  selector: 'app-stress-pie',
  templateUrl: './stress-pie.component.html',
  styleUrls: ['./stress-pie.component.scss']
})
export class StressPieComponent {

  category = ECategory.STRESS;

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
