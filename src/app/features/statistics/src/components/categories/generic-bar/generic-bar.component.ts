import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { ITimeBucket, IQuestionaireItem, IBasicResponse } from '@shared/types/server';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { StatisticsDataAccessService, EAggregation } from '../../../data-access/services/statistics-data-access.service';
import { StatisticsMappingService } from '../../../data-mapping/services/statistics-mapping/statistics-mapping.service';

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

  data1$: Observable<ITimeBucket<IBasicResponse>[]>;

  urlSuffix: string;

  yAxis1$: Observable<number[]>;
  yAxis2$: Observable<number[]>;

  xAxis = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  uniqueOptions$: Observable<string[]>;
  filterByOption$: Subject<string> = new Subject<string>();
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private statisticsMappingService: StatisticsMappingService,
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
    );

    this.uniqueOptions$ = this.data1$.pipe(
      map((timeBuckets: ITimeBucket<IBasicResponse>[]) => {
        const set = new Set<string>();
        timeBuckets.forEach(bucket => {
          bucket.data.user.forEach(dataEntry => {
            set.add(dataEntry.option);
          });
        });
        return Array.from(set);
      }),
      takeUntil(this.destroy$),
    );

    this.yAxis1$ = combineLatest([this.data1$, this.filterByOption$]).pipe(
      map(([timeBuckets, filter]) =>
        this.statisticsMappingService.mapToBarChartYAxis(
          timeBuckets,
          this.filterActive ? filter : undefined
        )),
      takeUntil(this.destroy$),
    );

  }

  ngAfterViewInit(): void {
    this.uniqueOptions$.pipe(
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
