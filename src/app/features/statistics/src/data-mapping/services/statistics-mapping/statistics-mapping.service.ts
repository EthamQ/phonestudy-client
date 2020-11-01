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
}
