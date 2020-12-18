import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { EAggregation, StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { EColorStyle } from '../../../charts';
import { environment } from 'environments/environment';
import { ITimeBucket, IBasicResponse, IStatisticItem } from '@shared/types/server';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-communication-pie',
  templateUrl: './communication-pie.component.html',
})
export class CommunicationPieComponent {
  data$: Observable<ITimeBucket<IBasicResponse<IStatisticItem[]>>[]>;
  dataUser$: Observable<IStatisticItem[]>;
  dataCompare$: Observable<IStatisticItem[]>;

  description = 'Häufigkeit Apps in dem Zeitraum geöffnet';
  colorStyle = EColorStyle.RANDOM;
  category = ECategory.COMMUNICATION;
  dateFrom: string;
  dateTo: string;
  
  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
  ) { }

  ngOnInit() {
    this.dateFrom = '2020-04-20';
    this.dateTo = this.dateService.addDays(this.dateFrom, 150);
    this.data$ = this.statisticsDataAccessService.getPieChartData(
      'communication',
      this.dateFrom,
      150,
      EAggregation.NO_AGGREGATION,
      {
        compareWith: environment.compareWith,
        type: 'simple',
        aggregation: 'by-time-frame',
      },
    );

    this.dataUser$ = this.data$.pipe(
      map(timeBuckets => timeBuckets[0].data.user),
    );

    this.dataCompare$ = this.data$.pipe(
      map(timeBuckets => {
        const dataCompare = timeBuckets[0].data.compare;

        if(dataCompare && dataCompare.length > 0) {
          return dataCompare;
        }

        return null;
      }),
    );
  }
}
