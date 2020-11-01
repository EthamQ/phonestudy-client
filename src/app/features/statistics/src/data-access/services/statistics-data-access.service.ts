import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateService, ELocalStorageKey, LocalStorageService } from '@shared/services';
import { ECategory } from '@shared/types';
import { IQuestionaireItem, IServerResponse, ITimeBucket } from '@shared/types/server';
import { StatisticsMappingService } from '../../data-mapping/services/statistics-mapping/statistics-mapping.service';

export enum EAggregation {
  NO_AGGREGATION,
  DAYS,
}

@Injectable()
export class StatisticsDataAccessService {

  private readonly baseUrl = 'http://localhost:3000/datafeatures';
  private readonly SECONDS_DAY = 86400;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private dateService: DateService,
    private statisticsMappingService: StatisticsMappingService,
  ) { }

  getStatistics(
    category: ECategory,
    dateFrom: string,
    days: number,
    aggregation: EAggregation,
  ): Observable<ITimeBucket<IQuestionaireItem[]>[]> {
    return this.http.get(this.getUrl(
      category,
      dateFrom,
      days,
      aggregation
    )).pipe(
      map((response: IServerResponse<IQuestionaireItem[]>) => this.statisticsMappingService.map(response)),
    );
  }

  private getUrl(
    category: ECategory,
    dateFrom: string,
    days: number,
    aggregation: EAggregation
  ): string {
    return `${this.baseUrl}/${category}`
      + `/${this.localStorageService.get(ELocalStorageKey.USERID)}`
      + `/?date_from=${dateFrom}`
      + `&date_to=${this.dateService.addDays(dateFrom, days)}`
      + `&timely-aggregation=${this.getAggregationSeconds(aggregation, days)}`;
  }

  private getAggregationSeconds(aggregation: EAggregation, days: number): number {
    switch (aggregation) {
      case EAggregation.NO_AGGREGATION:
        return days * this.SECONDS_DAY;
      case EAggregation.DAYS:
        return days;
    }
  }

}
