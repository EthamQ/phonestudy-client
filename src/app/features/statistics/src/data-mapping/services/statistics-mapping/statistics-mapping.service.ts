import { Injectable } from '@angular/core';
import { IServerResponse, IStatisticItem, ITimeBucket, IBasicResponse } from '@shared/types/server';

@Injectable({
  providedIn: 'root'
})
export class StatisticsMappingService {

  constructor() { }

  map(response: IServerResponse<any>): ITimeBucket<any>[] {
    return Object.entries(response).map(
      (entry: [string, ITimeBucket<any>]) => entry[1],
    );
  }

}
