import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory, IRange } from '@shared/types';
import { ITimeBucket, IQuestionaireItem } from '@shared/types/server';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

  data$: Observable<ITimeBucket<IQuestionaireItem[]>[]>

  values1$: Observable<number[]>;

  category: ECategory;
  options = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  filterByOption = 'Spotify';


  values1: number[];
  values2: number[];

  numberOfDays = 7;
  dateRange: IRange<string>;

  ngOnInit(): void {
    const startDate = '2020-08-01';; // monday
    this.dateRange = {
      from: startDate,
      to: this.dateService.addDays(startDate, this.numberOfDays),
    };

    this.data$ = this.statisticsDataAccessService.getStatistics(
      this.category,
      this.dateRange.from,
      7,
      EAggregation.DAYS,
    );

    this.values1$ = this.data$.pipe(
      tap(x => console.log(x)),
      map((timeBuckets: ITimeBucket<IQuestionaireItem[]>[]) =>
        (timeBuckets
          .map(bucket => ({
              ...bucket,
              data: bucket.data.filter(x => x.option === this.filterByOption)
            }))
          .map(bucket => bucket.data.map(x => x.value * x.weight))
          .map(x => x.length > 0 ? x.reduce((acc, curr) => acc + curr) : 0))
        ),
    );

  }
}
