import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { EColorStyle } from '../../../charts';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-mood-pie',
  templateUrl: './mood-pie.component.html',
})
export class MoodPieComponent {

  description = 'Verteilung Gefühlszustand insgesamt';
  colorStyle = EColorStyle.ASCENDING;
  category = ECategory.MOOD;
  endpoint = 'mood';
  payload =       {
    compareWith: environment.compareWith,
    type: 'simple',
    aggregation: 'total',
  };

}
