import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ELocalStorageKey, LocalStorageService } from '@shared/services';
import { ECategory } from '@shared/types';
import { IChartItems } from '@shared/types/chart';
import { IQuestionaireItem, IServerResponse, ITimeBucket } from '@shared/types/server';

@Injectable()
export class StatisticsDataAccessService {

  private readonly baseUrl = 'http://localhost:3000/datafeatures';
  private readonly SECONDS_DAY = 86400;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  getStatistics(category: ECategory, dateFrom: string, dateTo: string): Observable<IChartItems> {
    return this.http.get(this.getUrl(category, dateFrom, dateTo)).pipe(
      map((response: IServerResponse<IQuestionaireItem[]>) => response[`${dateFrom} 00:00:00`]),
      map((timeBucket: ITimeBucket<IQuestionaireItem[]>) => timeBucket.data),
      map((items: IQuestionaireItem[]) => items.sort((a, b) => b.positivity - a.positivity)),
      map((items: IQuestionaireItem[]) => {
        return {
          options: items.map(item => item.option),
          values: items.map(item => item.value),
        }
      }),
    );
  }

  private getUrl(category: ECategory, dateFrom: string, dateTo: string): string {
    const aggregation = this.SECONDS_DAY;
    return `${this.baseUrl}/${category}`
      + `/${this.localStorageService.get(ELocalStorageKey.USERID)}`
      + `/?date_from=${dateFrom}&date_to=${dateTo}&timely-aggregation=${aggregation * 10}`;
  }

}
