import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { EColorStyle } from '../../../charts';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-stress-pie',
  templateUrl: './stress-pie.component.html',
})
export class StressPieComponent {

  description = 'Verteilung Stresslevel insgesamt';
  colorStyle = EColorStyle.ASCENDING;
  category = ECategory.STRESS;
  endpoint = 'stress';
  payload = {
    compareWith: environment.compareWith,
    type: 'simple',
    aggregation: 'total',
  };

}
