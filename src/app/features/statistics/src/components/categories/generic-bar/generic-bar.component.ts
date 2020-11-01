import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory, IRange } from '@shared/types';
import { ITimeBucket, IQuestionaireItem } from '@shared/types/server';
import { StatisticsDataAccessService, EAggregation } from '../../../data-access/services/statistics-data-access.service';

@Component({
  selector: 'app-generic-bar',
  template: '',
})
export class GenericBarComponent implements OnInit {

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
  ) { }

  category: ECategory;
  options = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  values1: number[];
  values2: number[];

  numberOfDays = 7;
  dateRange: IRange<string> = {
    from: '19.07.2020',
    to: '16.07.2020',
  }

  ngOnInit(): void {
    const startDate = '2020-04-20'; // monday
    this.dateRange = {
      from: startDate,
      to: this.dateService.addDays(startDate, this.numberOfDays),
    };

    this.statisticsDataAccessService.getStatistics(
      this.category,
      this.dateRange.from,
      7,
      EAggregation.DAYS,
    ).subscribe((timeBuckets: ITimeBucket<IQuestionaireItem[]>[]) => {
      this.values1 = timeBuckets
      .map(bucket => bucket.data.map(x => x.value * x.weight))
      .map(x => x.reduce((acc, curr) => acc + curr))
    });
  }
}
