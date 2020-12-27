import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { EAggregation, StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { environment } from 'environments/environment';
import { ITimeBucket, IBasicResponse, IStatisticsWeek } from '@shared/types/server';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-communication-bar',
  templateUrl: './communication-bar.component.html',
})
export class CommunicationBarComponent {
  data$: Observable<ITimeBucket<IBasicResponse<IStatisticsWeek>>[]> 
  dataUser$: Observable<IStatisticsWeek>;
  dataCompare$: Observable<IStatisticsWeek>;

  description = 'Verteilung Minuten telefoniert pro Wochentag';
  category = ECategory.COMMUNICATION;
  dateFrom: string;
  dateTo: string;

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
  ) { }

  ngOnInit(): void {
    this.dateFrom = '2020-04-20';
    this.dateTo = this.dateService.addDays(this.dateFrom, 150);

    this.data$ = this.statisticsDataAccessService.getBarChartData(
      'communication',
      this.dateFrom,
      150,
      EAggregation.NO_AGGREGATION,
      {
        compareWith: environment.compareWith,
        type: 'simple',
        aggregation: 'total-by-weekday',
      },
    );

    this.dataUser$ = this.data$.pipe(
      map(timeBuckets => timeBuckets[0].data.user),
    );

    this.dataCompare$ = this.data$.pipe(
      map(timeBuckets => {
        const dataCompare = timeBuckets[0].data.compare;

        if (environment.compareWith !== 'none') {
          return dataCompare;
        }

        return null;
      }),
    );
  }

}
