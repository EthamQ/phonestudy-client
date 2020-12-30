import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { environment } from 'environments/environment';
import { EColorStyle } from '../../../charts';

@Component({
  selector: 'app-communication-scatter',
  templateUrl: './communication-scatter.component.html',
})
export class CommunicationScatterComponent {

  description = 'Korrelation Minuten telefoniert und';
  colorStyle = EColorStyle.RANDOM;
  endpoint = 'communication';
  payload = {
    compareWith: environment.compareWith,
    type: 'correlation',
    aggregation: 'total & average',
  };
  textX = 'Minuten telefoniert';

  categories = [
    ECategory.COMMUNICATION,
    ECategory.STRESS,
    ECategory.MOOD,
    ECategory.SLEEP
  ];
  
}
