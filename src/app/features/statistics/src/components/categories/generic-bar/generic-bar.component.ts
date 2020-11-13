import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory, IRange } from '@shared/types';
import { ITimeBucket, IQuestionaireItem } from '@shared/types/server';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { StatisticsDataAccessService, EAggregation } from '../../../data-access/services/statistics-data-access.service';

@Component({
  selector: 'app-generic-bar',
  templateUrl: './generic-bar.component.html',
  styleUrls: ['./generic-bar.component.scss']
})
export class GenericBarComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
  ) { }

  destroy$: Subject<void> = new Subject<void>();

  data$: Observable<ITimeBucket<IQuestionaireItem[]>[]>

  values1$: Observable<number[]>;
  allOptions$: Observable<string[]>;
  filterByOption$: Subject<string> = new Subject<string>();

  category: ECategory;
  options = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  filterByOption = 'Spotify';

  filterActive = false;

  values1: number[];
  values2: number[];

  numberOfDays = 7;
  dateRange: IRange<string>;

  ngOnInit(): void {
    const startDate = '2020-08-01'; // monday
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

    this.allOptions$ = this.data$.pipe(
      map((timeBuckets: ITimeBucket<IQuestionaireItem[]>[]) => {
        const set = new Set<string>();
        timeBuckets.forEach(x => {
          x.data.forEach(y => {
            set.add(y.option);
          });
        });
        return Array.from(set);
      }),
      takeUntil(this.destroy$),
    );

    this.values1$ = combineLatest([this.data$, this.filterByOption$]).pipe(
      tap(x => console.log(x)),
      map(([timeBuckets, filter]) =>
        (timeBuckets
          .map(bucket => ({
            ...bucket,
            data: bucket.data.filter(x => this.filterActive ? x.option === filter : true)
          }))
          .map(bucket => bucket.data.map(x => x.value * x.weight))
          .map(x => x.length > 0 ? x.reduce((acc, curr) => acc + curr) : 0))
      ),
      takeUntil(this.destroy$),
    );
  }

  ngAfterViewInit(): void {
    this.allOptions$.pipe(
      take(1),
    ).subscribe(x => this.filterByOption$.next(x[0]));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onSelectionChange(option: string) {
    this.filterByOption$.next(option);
  }
}
