import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { EAggregation, StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { environment } from 'environments/environment';
import { GenericScatterComponent } from '../../../generic-chart-views/generic-scatter/generic-scatter.component';
import { CorrelationCalculationService } from '../../../../utils/correlation-calculation.service';
import { ColorService } from '../../../../utils/color.service';
import { StringService } from 'app/features/statistics/src/utils/string.service';
import { CategoryService } from 'app/features/statistics/src/utils/category.service';
import { ITimeBucket, IBasicResponse, IStatisticItem, ICorrelation } from '@shared/types/server';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EColorStyle } from '../../../charts';

@Component({
  selector: 'app-communication-scatter',
  templateUrl: './communication-scatter.component.html',
})
export class CommunicationScatterComponent {
  data$: Observable<ITimeBucket<IBasicResponse<ICorrelation>>[]>
  dataUser$: Observable<ICorrelation>;
  dataCompare$: Observable<ICorrelation>;

  description = 'Korrelation Minuten telefoniert und';
  colorStyle = EColorStyle.RANDOM;
  category = ECategory.COMMUNICATION;
  dateFrom: string;
  dateTo: string;
  textX = 'Minuten telefoniert';

  categories = [
    ECategory.COMMUNICATION,
    ECategory.STRESS,
    ECategory.MOOD,
    ECategory.SLEEP
  ];
  
  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
  ) { }

  ngOnInit() {
    this.dateFrom = '2020-04-20';
    this.dateTo = this.dateService.addDays(this.dateFrom, 150);
    this.data$ = this.statisticsDataAccessService.getScatterChartData(
      'communication',
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
}
