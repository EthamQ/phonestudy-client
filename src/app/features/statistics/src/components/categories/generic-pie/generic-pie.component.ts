import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { ITimeBucket, IQuestionaireItem } from '@shared/types/server';
import { StatisticsDataAccessService, EAggregation } from '../../../data-access/services/statistics-data-access.service';
import { EColorStyle } from '../../charts';

@Component({
  selector: 'app-generic-pie',
  template: '',
})
export class GenericPieComponent implements OnInit {

  category: ECategory;
  colorStyle: EColorStyle;
  urlSuffix: string;

  options: string[];
  values1: number[];
  values2: number[];

  daysToRequest = 7;
  dateFrom: string;
  dateTo: string;

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
    ) {  }

  ngOnInit(): void {
    this.dateFrom = '2020-08-01';
    this.dateTo = this.dateService.addDays(this.dateFrom, this.daysToRequest)

    this.statisticsDataAccessService.getStatistics(
      this.category,
      this.dateFrom,
      this.daysToRequest,
      EAggregation.NO_AGGREGATION,
    ).subscribe((timeBuckets: ITimeBucket<IQuestionaireItem[]>[]) => {
      this.options = timeBuckets[0].data.map(x => x.option);
      this.values1 = timeBuckets[0].data.map(x => x.value);
    });

}

}
