import { Injectable } from '@angular/core';
import { ITimeBucket, IBasicResponse, IStatisticItem } from '@shared/types/server';

@Injectable({
  providedIn: 'root'
})
export class BarChartService {

  constructor() { }

  filterByOption(items: IStatisticItem[][], filterBy?: string): IStatisticItem[][] {
    if (!filterBy) {
      return items;
    }

    return items.map(item => (item.filter(x => x.option === filterBy)));
  }

  getValueByDay(items: IStatisticItem[][]): number[] {
    return items
      .map(item => item.map(x => x.value * x.weight))
      .map(x => x.length > 0 ? x.reduce((acc, curr) => acc + curr) : 0);
  }

  getUniqueOptions(items: IStatisticItem[][]): string[] {
    const set = new Set<string>();
    items.forEach(itemArray => {
      itemArray.forEach(item => {
        set.add(item.option);
      });
    });
    return Array.from(set);
  }
}
