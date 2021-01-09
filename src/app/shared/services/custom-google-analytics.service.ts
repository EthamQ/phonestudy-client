import { Injectable } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { ApplicationInfoService } from './application-info.service';

export enum EGaEventAction {
  OPEN_START_PAGE = 'OPEN_START_PAGE',
  CLICK_CATEGORY = 'CLICK_CATEGORY',
  CLICK_DROPDOWN = 'CLICK_DROPDOWN',
}

@Injectable({
  providedIn: 'root'
})
export class CustomGoogleAnalyticsService {

  constructor(
    private gaService: GoogleAnalyticsService,
    private applicationInfoService: ApplicationInfoService,
    ) { }

    sendGaEvent(action: EGaEventAction, value = ''): void {
      this.gaService.event(action, this.applicationInfoService.getCurrentRoute(), value);
    }
}
