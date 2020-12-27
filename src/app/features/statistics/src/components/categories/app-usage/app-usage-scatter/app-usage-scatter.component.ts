import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { EAggregation, StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { environment } from 'environments/environment';
import { ITimeBucket, IBasicResponse, ICorrelation } from '@shared/types/server';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EColorStyle } from '../../../charts';

@Component({
  selector: 'app-app-usage-scatter',
  templateUrl: './app-usage-scatter.component.html',
})
export class AppUsageScatterComponent {
  data$: Observable<ITimeBucket<IBasicResponse<ICorrelation>>[]>
  dataUser$: Observable<ICorrelation>;
  dataCompare$: Observable<ICorrelation>;

  description = 'Korrelation App-Benutzung und';
  colorStyle = EColorStyle.RANDOM;
  dateFrom: string;
  dateTo: string;
  textX = 'App geöffnet';
  multipleOptions = true;

  categories = [
    ECategory.APP,
    ECategory.STRESS,
    ECategory.MOOD,
    ECategory.SLEEP,
  ];
  
  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
  ) { }

  ngOnInit() {
    this.dateFrom = '2020-04-20';
    this.dateTo = this.dateService.addDays(this.dateFrom, 150);
    this.data$ = this.statisticsDataAccessService.getScatterChartData(
      'app',
      this.dateFrom,
      150,
      EAggregation.NO_AGGREGATION,
      {
        compareWith: environment.compareWith,
        type: 'correlation',
        aggregation: 'total & average',
      },
    );

    this.dataUser$ = this.data$.pipe(
      map(timeBuckets => timeBuckets[0].data.user),
    );

    this.dataCompare$ = this.data$.pipe(
      map(timeBuckets => {
        const dataCompare = timeBuckets[0].data.compare;

        if(environment.compareWith !== 'none') {
          return dataCompare;
        }

        return null;
      }),
    );
  }

  // constructor(
  //   statisticsDataAccessService: StatisticsDataAccessService,
  //   dateService: DateService,
  //   correlationCalculationService: CorrelationCalculationService,
  //   colorService: ColorService,
  //   stringService: StringService,
  //   categoryService: CategoryService,
  // ) {
  //   super(
  //     statisticsDataAccessService,
  //     dateService,
  //     correlationCalculationService,
  //     colorService,
  //     stringService,
  //     categoryService,
  //   );
  //   this.categories = [
  //     ECategory.APP,
  //     ECategory.STRESS,
  //     ECategory.MOOD,
  //     ECategory.SLEEP
  //   ];

  //   this.multipleOptions = true;
  //   this.comparisonActive = environment.compareWith !== 'none';

  //   this.urlSuffix = 'app';

  //   this.textX = 'App geöffnet';

  //   this.description = 'Korrelation App-Benutzung und';

  //   this.requestPayload = {
  //     compareWith: environment.compareWith,
  //     type: 'correlation',
  //     aggregation: 'total & average',
  //   };
  // }

}
