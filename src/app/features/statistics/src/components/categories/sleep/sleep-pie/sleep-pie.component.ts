import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { EColorStyle } from '../../../charts';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-sleep-pie',
  templateUrl: './sleep-pie.component.html',
})
export class SleepPieComponent {

  description = 'Verteilung Schlafqualität insgesamt';
  colorStyle = EColorStyle.ASCENDING;
  category = ECategory.SLEEP;
  endpoint = 'sleep';
  payload =       {
    compareWith: environment.compareWith,
    type: 'simple',
    aggregation: 'total',
  };

}
