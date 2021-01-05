import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateService, ELocalStorageKey, LocalStorageService } from '@shared/services';
import { IBasicResponse, IServerResponse, ITimeBucket, ICorrelation, IStatisticItem, IStatisticsWeek, IRequestPayloadBar, IRequestPayloadPie, IRequestPayloadScatter } from '@shared/types/server';
import { StatisticsMappingService } from '../../data-mapping/services/statistics-mapping/statistics-mapping.service';

export enum EAggregation {
  NO_AGGREGATION,
  DAYS,
}

@Injectable()
export class StatisticsDataAccessService {

  // private readonly baseUrl = 'http://localhost:3000/datafeatures';
  private readonly baseUrl = 'https://quality.phonestudy.psy.lmu.de:9023/datafeatures';
  private readonly SECONDS_DAY = 86400;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private dateService: DateService,
    private statisticsMappingService: StatisticsMappingService,
  ) { }

  getPieChartData(
    urlSuffix: string,
    payload?: IRequestPayloadPie,
    dateFrom?: string,
    days?: number,
    aggregation?: EAggregation,
  ): Observable<ITimeBucket<IBasicResponse<IStatisticItem[]>>[]> {
    return this.http.post(this.getUrl(
      urlSuffix,
      dateFrom,
      days,
      aggregation
    ), payload).pipe(
      take(1),
      map((response: IServerResponse<IBasicResponse<IStatisticItem[]>>) => this.statisticsMappingService.map(response)),
    );
  }

  getBarChartData(
    urlSuffix: string,
    payload: IRequestPayloadBar,
    dateFrom?: string,
    days?: number,
    aggregation?: EAggregation,
  ): Observable<ITimeBucket<IBasicResponse<IStatisticsWeek>>[]> {
    return this.http.post(this.getUrl(
      urlSuffix,
      dateFrom,
      days,
      aggregation
    ), payload).pipe(
      take(1),
      map((response: IServerResponse<IBasicResponse<IStatisticItem[]>>) => this.statisticsMappingService.map(response)),
    );
  }

  getScatterChartData(
    urlSuffix: string,
    payload: IRequestPayloadScatter,
    dateFrom?: string,
    days?: number,
    aggregation?: EAggregation,
  ): Observable<ITimeBucket<IBasicResponse<ICorrelation>>[]> {
    return this.http.post(this.getUrl(
      urlSuffix,
      dateFrom,
      days,
      aggregation
    ), payload).pipe(
      take(1),
      map((response: IServerResponse<IBasicResponse<ICorrelation>>) => this.statisticsMappingService.map(response)),
    );
  }

  private getUrl(
    urlSuffix: string,
    dateFrom: string,
    days: number,
    aggregation: EAggregation
  ): string {
    // Date and aggregation are determined in the backend so for now it is deactivated in the frontend.
    return `${this.baseUrl}/${urlSuffix}`
      + `/${this.localStorageService.get(ELocalStorageKey.USERID)}`;
      // + `/?date_from=${dateFrom}`
      // + `&date_to=${this.dateService.addDays(dateFrom, days)}`
      // + `&timely-aggregation=${this.getAggregationSeconds(aggregation, days)}`;
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
