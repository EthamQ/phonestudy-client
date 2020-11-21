import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { ITimeBucket, IBasicResponse, IStatisticItem } from '@shared/types/server';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { StatisticsDataAccessService, EAggregation } from '../../../data-access/services/statistics-data-access.service';
import { BarChartService } from '../../../data-mapping/services/statistics-mapping/bar-chart/bar-chart.service';

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

  requestPayload;

  uniqueOptions$: Observable<string[]>;
  filterByOption$: Subject<string> = new Subject<string>();
  data1$: Observable<ITimeBucket<IBasicResponse<IStatisticItem[]>>[]>;
  yAxis1$: Observable<number[]>;
  yAxis2$: Observable<number[]>;
  destroy$: Subject<void> = new Subject<void>();

  xAxis = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private barChartService: BarChartService,
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

    this.uniqueOptions$ = this.data1$.pipe(
      map((timeBuckets: ITimeBucket<IBasicResponse<IStatisticItem[]>>[]) =>
        this.barChartService.getUniqueOptions(timeBuckets.map(x => x.data.user))
      ),
      takeUntil(this.destroy$),
    );

    this.yAxis1$ = combineLatest([this.data1$, this.filterByOption$]).pipe(
      map(([timeBuckets, filter]) =>
        this.barChartService.getValueByDay(
          this.barChartService.filterByOption(
            timeBuckets.map(x => x.data.user),
            filter)),
        takeUntil(this.destroy$),
      ));

    if (this.comparisonActive) {
      this.yAxis2$ = combineLatest([this.data1$, this.filterByOption$]).pipe(
        map(([timeBuckets, filter]) =>
          this.barChartService.getValueByDay(
            this.barChartService.filterByOption(
              timeBuckets.map(x => x.data.compare),
              filter)),
          takeUntil(this.destroy$),
        ));
    }
  }

  ngAfterViewInit(): void {
    this.uniqueOptions$.pipe(
      take(1),
    ).subscribe(x => this.filterByOption$.next(this.filterActive ? x[0] : null));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onSelectionChange(option: string) {
    this.filterByOption$.next(option);
  }
}
