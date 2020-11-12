import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory, IRange } from '@shared/types';
import { ITimeBucket, IQuestionaireItem } from '@shared/types/server';
import { StatisticsDataAccessService, EAggregation } from '../../../data-access/services/statistics-data-access.service';
import { EColorStyle } from '../../charts';

@Component({
  selector: 'app-generic-pie',
  template: '',
})
export class GenericPieComponent implements OnInit {

  category: ECategory;

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
    ) {  }

  options: string[];
  values1: number[];
  values2: number[];

  colorStyle: EColorStyle;

  numberOfDays = 7;
  dateRange: IRange<string>;

  ngOnInit(): void {
    const startDate = '2020-08-01';
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
