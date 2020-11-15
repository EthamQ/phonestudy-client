import { Injectable } from '@angular/core';
import { IServerResponse, IQuestionaireItem, ITimeBucket, IBasicResponse } from '@shared/types/server';

@Injectable({
  providedIn: 'root'
})
export class StatisticsMappingService {

  constructor() { }

  map(response: IServerResponse<IBasicResponse>): ITimeBucket<IBasicResponse>[] {
    return Object.entries(response).map(
      (entry: [string, ITimeBucket<IBasicResponse>]) => entry[1],
    );
  }

  mapToBarChartYAxis(timeBuckets: ITimeBucket<IBasicResponse>[], filterBy?: string): number[] {
    return timeBuckets
      .map(bucket => ({
        ...bucket,
        data: bucket.data.user.filter(x => filterBy ? x.option === filterBy : true),
      }))
      .map(bucket => bucket.data.map(x => x.value * x.weight))
      .map(x => x.length > 0 ? x.reduce((acc, curr) => acc + curr) : 0);
  }

}
