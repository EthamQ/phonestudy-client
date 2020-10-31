import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ECategory, IChartItem, IServerResponse, ITimeBucket } from '@shared/types';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class StatisticsDataAccessService {

  private readonly baseUrl = 'http://localhost:3000/datafeatures';

  constructor(private http: HttpClient) { }

  getStatistics(category: ECategory, dateFrom: string, dateTo: string): Observable<IChartItem[]> {
    const day = 86400;
    const userId = 'z6a0d70ba';
    const url = `${this.baseUrl}/${category}/${userId}/?date_from=${dateFrom}&date_to=${dateTo}&timely-aggregation=${day}`;
    return this.http.get(url).pipe(
      map((response: IServerResponse<IChartItem[]>) => response[`${dateFrom} 00:00:00`]),
      map((response: ITimeBucket<IChartItem[]>) => response.data),
    );
  }
  
}
