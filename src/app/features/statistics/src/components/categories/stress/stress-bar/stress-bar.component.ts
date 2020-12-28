import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { IRequestPayloadBar } from '@shared/types/server';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-stress-bar',
  templateUrl: './stress-bar.component.html',
})
export class StressBarComponent {

  description = 'Verteilung Stresslevel pro Wochentag';
  category = ECategory.STRESS;
  endpoint = 'stress';
  payload: IRequestPayloadBar = {
    compareWith: environment.compareWith,
    type: 'simple',
    aggregation: 'average-by-weekday',
  };

}
