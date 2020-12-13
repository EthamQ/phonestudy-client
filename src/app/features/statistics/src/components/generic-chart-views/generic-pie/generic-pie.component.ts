import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ITimeBucket, IStatisticItem, IBasicResponse } from '@shared/types/server';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { StatisticsDataAccessService, EAggregation } from '../../../data-access/services/statistics-data-access.service';
import { ColorService, EColor } from '../../../utils/color.service';
import { EColorStyle } from '../../charts';
import { GenericChartComponent } from '../generic-chart/generic-chart.component';

@Component({
  selector: 'app-generic-pie',
  template: '',
})
export class GenericPieComponent extends GenericChartComponent implements OnInit {

  data1$: Observable<ITimeBucket<IBasicResponse<IStatisticItem[]>>[]>;
  data2$: Observable<ITimeBucket<IStatisticItem[]>[]>;

  increaseWidthPieChart: boolean;

  colorStyle: EColorStyle;
  colors: EColor[];

  labels: string[];
  valuesUser: number[];
  valuesCompare: number[];

  daysToRequest = 7;

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
    private colorService: ColorService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.dateFrom = '2020-04-20';
    this.dateTo = this.dateService.addDays(this.dateFrom, 200);
    console.log('this.dateFrom', this.dateFrom);
    console.log('this.dateTo', this.dateTo);

    this.data1$ = this.statisticsDataAccessService.getStatistics(
      this.urlSuffix,
      this.dateFrom,
      150,
      EAggregation.NO_AGGREGATION,
      this.requestPayload,
    );

    this.data1$.pipe(take(1)).subscribe(timeBuckets => {
      const userItems: IStatisticItem[] = timeBuckets[0].data.user;
      console.log('userItems', userItems);
      const userItemsSortedByValueASC: IStatisticItem[] = [...userItems].sort((a, b) => a.value - b.value);

      // All have to be in the same order to be displayed correctly
      this.labels = userItemsSortedByValueASC.map(x => x.option);
      this.valuesUser = userItemsSortedByValueASC.map(x => x.value);
      if(this.colorStyle === EColorStyle.ASCENDING) {
        this.colors = userItemsSortedByValueASC.map(x => this.colorService.getColorForPositivity(x.positivity));
      }
     
      // When there are too many labels the chart itself will decrease in size.
      // Therefore we increase its width.
      this.increaseWidthPieChart = this.valuesUser.length > 10;

      if (this.comparisonActive) {
        const compareItems: IStatisticItem[] = timeBuckets[0].data.compare;
        console.log('compareItems', compareItems);
        // They need to have the same order as the user items for it to have the correct colors
        const compareItemsSortedByUserOption: IStatisticItem[] = compareItems.sort(
          (a, b) =>
            userItemsSortedByValueASC.findIndex(x => x.option === a.option)
            - userItemsSortedByValueASC.findIndex(x => x.option === b.option)
        );

        this.valuesCompare = compareItemsSortedByUserOption.map(x => x.value);
      }
    });

  }

}
