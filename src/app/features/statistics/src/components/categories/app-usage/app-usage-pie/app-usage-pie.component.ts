import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { environment } from 'environments/environment';
import { EColorStyle } from '../../../charts';

@Component({
  selector: 'app-app-usage-pie',
  templateUrl: './app-usage-pie.component.html',
})
export class AppUsagePieComponent {

  description = 'Häufigkeit Apps in dem Zeitraum geöffnet';
  colorStyle = EColorStyle.RANDOM;
  category = ECategory.APP;
  endpoint = 'app';
  payload = {
    compareWith: environment.compareWith,
    type: 'simple',
    aggregation: 'total-option-value',
  };

}
