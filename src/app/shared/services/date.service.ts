import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  /**
   * @param date YYYY-MM-DD
   */
  addDays(date: string | Date, daysToAdd: number): string {
    return moment(date).add(daysToAdd, 'days').format('YYYY-MM-DD');
  }
}
