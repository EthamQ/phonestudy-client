import { Injectable } from '@angular/core';
import { IServerResponse, IQuestionaireItem, ITimeBucket } from '@shared/types/server';

@Injectable({
  providedIn: 'root'
})
export class StatisticsMappingService {

  constructor() { }

  map(response: IServerResponse<IQuestionaireItem[]>): ITimeBucket<IQuestionaireItem[]>[] {
    return Object.entries(response).map(
      (entry: [string, ITimeBucket<IQuestionaireItem[]>]) => entry[1],
    );
  }

  mapToBarChartYAxis(timeBuckets: ITimeBucket<IQuestionaireItem[]>[], filterBy?: string): number[] {
    return timeBuckets
      .map(bucket => ({
        ...bucket,
        data: bucket.data.filter(x => filterBy ? x.option === filterBy : true)
      }))
      .map(bucket => bucket.data.map(x => x.value * x.weight))
      .map(x => x.length > 0 ? x.reduce((acc, curr) => acc + curr) : 0);
  }

}
