import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { ITimeBucket, IQuestionaireItem } from '@shared/types/server';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { StatisticsDataAccessService, EAggregation } from '../../../data-access/services/statistics-data-access.service';

@Component({
  selector: 'app-generic-bar',
  templateUrl: './generic-bar.component.html',
  styleUrls: ['./generic-bar.component.scss']
})
export class GenericBarComponent implements OnInit, AfterViewInit, OnDestroy {
  category: ECategory;

  data$: Observable<ITimeBucket<IQuestionaireItem[]>[]>
  destroy$: Subject<void> = new Subject<void>();

  xAxis = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  yAxis1$: Observable<number[]>;

  filterActive = false;
  allOptions$: Observable<string[]>;
  filterByOption$: Subject<string> = new Subject<string>();

  daysToRequest = 7;
  dateFrom: string;
  dateTo: string;

  urlSuffix: string;

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
  ) { }

  ngOnInit(): void {
    this.dateFrom = '2020-08-01';
    this.dateTo = this.dateService.addDays(this.dateFrom, this.daysToRequest);

    this.data$ = this.statisticsDataAccessService.getStatistics(
      this.urlSuffix,
      this.dateFrom,
      this.daysToRequest,
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

    this.yAxis1$ = combineLatest([this.data$, this.filterByOption$]).pipe(
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
