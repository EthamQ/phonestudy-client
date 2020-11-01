import { Component } from '@angular/core';
import { ECategory, IRange } from '@shared/types';
import { EColorStyle } from '../../../charts';
import { EAggregation, StatisticsDataAccessService } from '../../../../data-access/services/statistics-data-access.service';
import { IChartItems } from '@shared/types/chart';
import { DateService } from '@shared/services';
import { ITimeBucket, IQuestionaireItem } from '@shared/types/server';

@Component({
  selector: 'app-stress-pie',
  templateUrl: './stress-pie.component.html',
  styleUrls: ['./stress-pie.component.scss']
})
export class StressPieComponent {

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
    ) { }

  options: string[];
  values1: number[];
  values2: number[];

  category = ECategory.STRESS;
  colorStyle = EColorStyle.DESCENDING;

  numberOfDays = 7;
  dateRange: IRange<string>;

  ngOnInit(): void {
    const startDate = '2020-04-15';
    this.dateRange = {
      from: startDate,
      to: this.dateService.addDays(startDate, this.numberOfDays),
    };

    this.statisticsDataAccessService.getStatistics(
      this.category,
      this.dateRange.from,
      10,
      EAggregation.NO_AGGREGATION,
    ).subscribe((timeBuckets: ITimeBucket<IQuestionaireItem[]>[]) => {
      this.options = timeBuckets[0].data.map(x => x.option);
      this.values1 = timeBuckets[0].data.map(x => x.value);
    });
  }






}
