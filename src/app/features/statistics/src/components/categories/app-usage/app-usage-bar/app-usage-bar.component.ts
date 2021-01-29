import {Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { IRequestPayloadBar } from '@shared/types/server';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-app-usage-bar',
  templateUrl: './app-usage-bar.component.html',
})
export class AppUsageBarComponent {

  description = 'Anzahl aufgezeichneter Aktivitäten von Apps pro Wochentag (Nur Apps die du benutzt hast)';
  textY = 'Aufgezeichnete App-Aktivitäten';
  category = ECategory.APP;
  endpoint = 'app';
  payload: IRequestPayloadBar = {
    compareWith: environment.compareWith,
    type: 'simple',
    aggregation: 'average-by-weekday',
  };
 
}
