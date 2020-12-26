import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: string): string {
    const asDate = new Date(date);
    return `${asDate.getDate()}/${asDate.getMonth()}/${asDate.getFullYear()}`;
  }

}
