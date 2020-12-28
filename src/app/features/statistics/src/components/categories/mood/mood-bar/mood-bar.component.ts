import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { IRequestPayloadBar } from '@shared/types/server';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-mood-bar',
  templateUrl: './mood-bar.component.html',
})
export class MoodBarComponent {

  description = 'Verteilung Gefühlszustand pro Wochentag';
  category = ECategory.MOOD;
  endpoint = 'mood';
  payload: IRequestPayloadBar = {
    compareWith: environment.compareWith,
    type: 'simple',
    aggregation: 'average-by-weekday',
  };

}
