import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { environment } from 'environments/environment';
import { EColorStyle } from '../../../charts';

@Component({
  selector: 'app-app-usage-scatter',
  templateUrl: './app-usage-scatter.component.html',
})
export class AppUsageScatterComponent {

  description = 'Korrelation App-Benutzung und';
  textX = 'App geöffnet';
  colorStyle = EColorStyle.RANDOM;
  payload = {
    compareWith: environment.compareWith,
    type: 'correlation',
    aggregation: 'total & average',
  };
  endpoint = 'app';
  multipleOptions = true;

  categories = [
    ECategory.APP,
    ECategory.STRESS,
    ECategory.MOOD,
    ECategory.SLEEP,
  ];
}
