import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ITimeBucket, IBasicResponse, IStatisticItem } from '@shared/types/server';
import { combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, map, startWith, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { flatten } from 'underscore';
import { StatisticsDataAccessService, EAggregation } from '../../../data-access/services/statistics-data-access.service';
import { GenericChartComponent } from '../../generic-chart/generic-chart.component';

enum EDataOrigin {
  USER,
  COMPARE,
}

@Component({
  selector: 'app-generic-bar',
  templateUrl: './generic-bar.component.html',
  styleUrls: ['./generic-bar.component.scss'],
})
export class GenericBarComponent extends GenericChartComponent implements OnInit, OnDestroy {
  filterActive = false;
  daysToRequest = 7;

  uniqueOptions$: Observable<string[]>;
  filterByOption$: Subject<string> = new Subject<string>();
  timeBuckets$: Observable<ITimeBucket<IBasicResponse<IStatisticItem[]>>[]>;
  destroy$: Subject<void> = new Subject<void>();

  xAxis = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  yAxis1$: ReplaySubject<number[]> = new ReplaySubject(1);
  yAxis2$: ReplaySubject<number[]> = new ReplaySubject(1);

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.dateFrom = '2020-08-01';
    this.dateTo = this.dateService.addDays(this.dateFrom, this.daysToRequest);

    this.timeBuckets$ = this.statisticsDataAccessService.getStatistics(
      this.urlSuffix,
      this.dateFrom,
      this.daysToRequest,
      EAggregation.DAYS,
      this.requestPayload,
    );

    combineLatest([this.timeBuckets$, this.filterByOption$])
    .pipe(takeUntil(this.destroy$))
    .subscribe(([buckets, filter]) => {
      this.yAxis1$.next(this.getValuesMatchingFilter(buckets, filter, EDataOrigin.USER));
      this.yAxis2$.next(this.getValuesMatchingFilter(buckets, filter, EDataOrigin.COMPARE));
    });

    this.uniqueOptions$ = this.timeBuckets$.pipe(
      take(1),
      map((timeBuckets: ITimeBucket<IBasicResponse<IStatisticItem[]>>[]) =>
        this.getUniqueOptions(timeBuckets.map(x => x.data.user))
      ),
      takeUntil(this.destroy$),
    );

    this.uniqueOptions$.pipe(
      take(1),
    ).subscribe(uniqueOptions => this.filterByOption$.next(uniqueOptions[0]));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  getValuesMatchingFilter(buckets: ITimeBucket<IBasicResponse<IStatisticItem[]>>[], filter: string, origin: EDataOrigin): number[] {
    let originData: IStatisticItem[];

    if (origin === EDataOrigin.USER) {
      originData = flatten(buckets.map(bucket => bucket.data.user));
    }
    else {
      originData = flatten(buckets.map(bucket => bucket.data.compare));
    }

    return originData
      .filter((data: IStatisticItem) => (!filter || data.option === filter))
      .map(data => data.value);
  }

  onSelectionChange(option: string): void {
    this.filterByOption$.next(option);
  }

  private getUniqueOptions(items: IStatisticItem[][]): string[] {
    const set = new Set<string>();
    items.forEach(itemArray => {
      itemArray.forEach(item => {
        set.add(item.option);
      });
    });
    return Array.from(set);
  }
}
