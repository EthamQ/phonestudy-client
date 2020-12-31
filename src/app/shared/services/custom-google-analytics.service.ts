import { Injectable } from '@angular/core';
import { ECategory } from '@shared/types';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { ELocalStorageKey, LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomGoogleAnalyticsService {

  constructor(
    private gaService: GoogleAnalyticsService,
    private localStorageService: LocalStorageService,
    ) { }

    sendChartVisitEvent(chart: string, compareWith: string, category: ECategory): void {
      const username: string = this.localStorageService.get(ELocalStorageKey.USERID);
      this.gaService.event('visit_chart', chart, `${username} | ${compareWith} | ${category}`);
    }
}
