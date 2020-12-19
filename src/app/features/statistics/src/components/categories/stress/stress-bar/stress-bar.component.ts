import { ChangeDetectorRef, Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { ITimeBucket, IBasicResponse, IStatisticsWeek } from '@shared/types/server';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EAggregation, StatisticsDataAccessService } from '../../../../data-access/services/statistics-data-access.service';

@Component({
  selector: 'app-stress-bar',
  templateUrl: './stress-bar.component.html',
})
export class StressBarComponent {
  data$: Observable<ITimeBucket<IBasicResponse<IStatisticsWeek>>[]> 
  dataUser$: Observable<IStatisticsWeek>;
  dataCompare$: Observable<IStatisticsWeek>;

  description = 'Verteilung Stresslevel pro Wochentag';
  category = ECategory.STRESS;
  dateFrom: string;
  dateTo: string;

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
  ) { }

  ngOnInit() {
    this.dateFrom = '2020-04-20';
    this.dateTo = this.dateService.addDays(this.dateFrom, 150);

    this.data$ = this.statisticsDataAccessService.getBarChartData(
      'stress',
      this.dateFrom,
      150,
      EAggregation.NO_AGGREGATION,
      {
        compareWith: environment.compareWith,
        type: 'simple',
        aggregation: 'average-by-weekday',
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
