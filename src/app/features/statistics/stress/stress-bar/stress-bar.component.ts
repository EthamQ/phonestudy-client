import { Component } from '@angular/core';
import { ECategory } from '@shared/types';

@Component({
  selector: 'app-stress-bar',
  templateUrl: './stress-bar.component.html',
  styleUrls: ['./stress-bar.component.scss']
})
export class StressBarComponent {

  category = ECategory.STRESS;

    // public pieChartLabels: Label[] = ['sehr angenehm', 'angenehm', 'unangenehm', 'eher unangenehm'];
  // public pieChartLabels: Label[] = ['entspannt', 'eher entspannt', 'eher gestresst', 'sehr gestresst'];

}
