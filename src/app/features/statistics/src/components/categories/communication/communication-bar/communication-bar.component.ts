import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { IRequestPayloadBar } from '@shared/types/server';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-communication-bar',
  templateUrl: './communication-bar.component.html',
})
export class CommunicationBarComponent {

  description = 'Verteilung Minuten telefoniert pro Wochentag';
  textY = 'Anzahl Minuten telefoniert insgesamt';
  category = ECategory.COMMUNICATION;
  endpoint = 'communication';
  payload: IRequestPayloadBar = {
    compareWith: environment.compareWith,
    type: 'simple',
    aggregation: 'total-by-weekday',
  };

}
