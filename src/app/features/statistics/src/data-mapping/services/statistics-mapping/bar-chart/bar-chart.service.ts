import { Injectable } from '@angular/core';
import { ITimeBucket, IBasicResponse, IQuestionaireItem } from '@shared/types/server';

@Injectable({
  providedIn: 'root'
})
export class BarChartService {

  constructor() { }

  filterByOption(items: IQuestionaireItem[][], filterBy?: string): IQuestionaireItem[][] {
    if (!filterBy) {
      return items;
    }

    return items.map(item => (item.filter(x => x.option === filterBy)));
  }

  getValueByDay(items: IQuestionaireItem[][]): number[] {
    return items
      .map(item => item.map(x => x.value * x.weight))
      .map(x => x.length > 0 ? x.reduce((acc, curr) => acc + curr) : 0);
  }

  getUniqueOptions(items: IQuestionaireItem[][]): string[] {
    const set = new Set<string>();
    items.forEach(itemArray => {
      itemArray.forEach(item => {
        set.add(item.option);
      });
    });
    return Array.from(set);
  }
}
