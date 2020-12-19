import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { DateService } from '@shared/services';
import { EAggregation, StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { EColorStyle } from '../../../charts';
import { environment } from 'environments/environment';
import { ITimeBucket, IBasicResponse, IStatisticItem } from '@shared/types/server';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-stress-pie',
  templateUrl: './stress-pie.component.html',
})
export class StressPieComponent {

  data$: Observable<ITimeBucket<IBasicResponse<IStatisticItem[]>>[]>;
  dataUser$: Observable<IStatisticItem[]>;
  dataCompare$: Observable<IStatisticItem[]>;

  description = 'Verteilung Stresslevel insgesamt';
  colorStyle = EColorStyle.ASCENDING;
  category = ECategory.STRESS;
  dateFrom: string;
  dateTo: string;
  chartTitle1: string;
  chartTitle2: string;

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
  ) { }

  ngOnInit() {
    this.dateFrom = '2020-04-20';
    this.dateTo = this.dateService.addDays(this.dateFrom, 150);

    this.data$ = this.statisticsDataAccessService.getPieChartData(
      'stress',
      this.dateFrom,
      150,
      EAggregation.NO_AGGREGATION,
      {
        compareWith: environment.compareWith,
        type: 'simple',
        aggregation: 'total',
      },
    );

    this.dataUser$ = this.data$.pipe(
      map(timeBuckets => timeBuckets[0].data.user),
    );

    this.dataCompare$ = this.data$.pipe(
      map(timeBuckets => {
        const dataCompare = timeBuckets[0].data.compare;

        if (environment.compareWith !== 'none') {
          this.chartTitle1 = 'Du';
          this.chartTitle2 = 'Alle anderen Teilnehmer';
          return dataCompare;
        }

        return null;
      }),
    );
  }

}
