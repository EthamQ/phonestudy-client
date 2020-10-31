import { Pipe, PipeTransform } from '@angular/core';
import { IRange } from '../types/generic.type';

@Pipe({
  name: 'dateRange'
})
export class DateRangePipe implements PipeTransform {

  transform(dateRange: IRange<string>): unknown {
    return `${dateRange.from} - ${dateRange.to}`
  }

}
