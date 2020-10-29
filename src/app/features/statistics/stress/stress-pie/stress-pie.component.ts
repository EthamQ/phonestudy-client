import { Component } from '@angular/core';
import { ECategory } from '@shared/types/category.type';
       
@Component({
  selector: 'app-stress-pie',
  templateUrl: './stress-pie.component.html',
  styleUrls: ['./stress-pie.component.scss']
})
export class StressPieComponent {

  category = ECategory.STRESS;

  options = ['sehr gut', 'gut', 'eher schlecht', 'sehr schlecht'];

  values1 = [3, 4, 1, 2];

  values2 = undefined;

}
