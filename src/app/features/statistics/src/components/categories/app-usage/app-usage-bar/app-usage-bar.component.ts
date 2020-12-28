import {Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { IRequestPayloadBar } from '@shared/types/server';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-app-usage-bar',
  templateUrl: './app-usage-bar.component.html',
})
export class AppUsageBarComponent {

  description = 'Verteilung App-Benutzung pro Wochentag';
  category = ECategory.APP;
  endpoint = 'app';
  payload: IRequestPayloadBar = {
    compareWith: environment.compareWith,
    type: 'simple',
    aggregation: 'total-by-weekday',
  };
 
}
