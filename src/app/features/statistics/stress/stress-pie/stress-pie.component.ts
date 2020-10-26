import { Component } from '@angular/core';

@Component({
  selector: 'app-stress-pie',
  templateUrl: './stress-pie.component.html',
  styleUrls: ['./stress-pie.component.scss']
})
export class StressPieComponent {

  options = ['sehr gut', 'gut', 'eher schlecht', 'sehr schlecht'];

  values1 = [3, 4, 1, 2];

  values2 = undefined;

}
