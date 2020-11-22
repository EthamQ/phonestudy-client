import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { ITimeBucket, IBasicResponse, IStatisticItem, IRequestPayload } from '@shared/types/server';
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
  comparisonActive = false;
  filterActive = false;
  daysToRequest = 7;
  dateFrom: string;
  dateTo: string;
  urlSuffix: string;

  requestPayload: IRequestPayload;

  uniqueOptions$: Observable<string[]>;
  filterByOption$: Subject<string> = new Subject<string>();
  data1$: Observable<ITimeBucket<IBasicResponse<IStatisticItem[]>>[]>;
  yAxis1$: Observable<number[]>;
  yAxis2$: Observable<number[]>;
  destroy$: Subject<void> = new Subject<void>();

  xAxis = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private dateService: DateService,
  ) { }

  ngOnInit(): void {
    this.dateFrom = '2020-08-01';
    this.dateTo = this.dateService.addDays(this.dateFrom, this.daysToRequest);

    this.data1$ = this.statisticsDataAccessService.getStatistics(
      this.urlSuffix,
      this.dateFrom,
      this.daysToRequest,
      EAggregation.DAYS,
      this.requestPayload,
    );

    this.yAxis1$ = combineLatest([this.data1$, this.filterByOption$]).pipe(
      map(([buckets, filter]) => {
        console.log(buckets);
        const valueByDay = [];

        buckets.forEach(bucket => {
          bucket.data.user.forEach(data => {
            if (!filter || data.option === filter) {
              valueByDay.push(data.value);
            }
          });
        });

        return valueByDay;
      })
    );

    if (this.comparisonActive) {
      this.yAxis2$ = combineLatest([this.data1$, this.filterByOption$]).pipe(
        map(([buckets, filter]) => {
          const valueByDay = [];

          buckets.forEach(bucket => {
            bucket.data.compare.forEach(data => {
              if (!filter || data.option === filter) {
                valueByDay.push(data.value);
              }
            });
          });

          return valueByDay;
        })
      );
    }
  }

  ngAfterViewInit(): void {
    if (this.filterActive) {
      this.uniqueOptions$ = this.data1$.pipe(
        map((timeBuckets: ITimeBucket<IBasicResponse<IStatisticItem[]>>[]) =>
          this.getUniqueOptions(timeBuckets.map(x => x.data.user))
        ),
        takeUntil(this.destroy$),
      );

      this.uniqueOptions$.pipe(
        take(1),
      ).subscribe(allOptions => this.filterByOption$.next(allOptions[0]));

    } else {
      // To make the observable emit a value
      this.filterByOption$.next(null)
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
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
