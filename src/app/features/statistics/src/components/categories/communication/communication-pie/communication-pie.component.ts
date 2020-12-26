import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { EColorStyle } from '../../../charts';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-communication-pie',
  templateUrl: './communication-pie.component.html',
})
export class CommunicationPieComponent {

  description = 'Häufigkeit Apps in dem Zeitraum geöffnet';
  colorStyle = EColorStyle.RANDOM;
  category = ECategory.COMMUNICATION;
  endpoint = 'communication';
  payload = {
    compareWith: environment.compareWith,
    type: 'simple',
    aggregation: 'by-time-frame',
  };

}
