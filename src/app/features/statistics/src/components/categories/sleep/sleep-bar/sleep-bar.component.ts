import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { IRequestPayloadBar } from '@shared/types/server';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-sleep-bar',
  templateUrl: './sleep-bar.component.html',
})
export class SleepBarComponent {

  description = 'Verteilung Schlafqualität pro Wochentag';
  category = ECategory.SLEEP;
  endpoint = 'sleep';
  payload: IRequestPayloadBar = {
    compareWith: environment.compareWith,
    type: 'simple',
    aggregation: 'average-by-weekday',
  };

}
