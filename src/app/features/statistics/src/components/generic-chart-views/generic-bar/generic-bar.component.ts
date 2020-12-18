import { Component, OnDestroy, OnInit } from '@angular/core';
import { DateService } from '@shared/services';
import { ITimeBucket, IBasicResponse, IStatisticItem, IStatisticsWeek, IRequestPayloadBar } from '@shared/types/server';
import { combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { flatten } from 'underscore';
import { StatisticsDataAccessService, EAggregation } from '../../../data-access/services/statistics-data-access.service';
import { GenericChartComponent } from '../generic-chart/generic-chart.component';
import { EDataOrigin } from '../../../types/types';


@Component({
  selector: 'app-generic-bar',
  templateUrl: './generic-bar.component.html',
  styleUrls: ['./generic-bar.component.scss'],
})
export class GenericBarComponent extends GenericChartComponent<IRequestPayloadBar> implements OnInit, OnDestroy {
  filterActive = false;
  daysToRequest = 200;

  uniqueOptions$: Observable<string[]>;
  filterByOption$: Subject<string> = new Subject<string>();
  timeBuckets$: Observable<ITimeBucket<IBasicResponse<IStatisticsWeek>>[]>;
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
    this.dateFrom = '2020-04-20';
    this.dateTo = this.dateService.addDays(this.dateFrom, this.daysToRequest);

    this.timeBuckets$ = this.statisticsDataAccessService.getBarChartData(
      this.urlSuffix,
      this.dateFrom,
      this.daysToRequest,
      EAggregation.NO_AGGREGATION,
      this.requestPayload,
    );

    combineLatest([this.timeBuckets$, this.filterByOption$])
    .pipe(takeUntil(this.destroy$))
    .subscribe(([buckets, filter]) => {
      console.log('new data', buckets)

      this.yAxis1$.next(this.getValuesMatchingFilter(buckets, filter, EDataOrigin.USER));
      if(this.comparisonActive) {
        this.yAxis2$.next(this.getValuesMatchingFilter(buckets, filter, EDataOrigin.COMPARE));
      }
    });

    this.uniqueOptions$ = this.timeBuckets$.pipe(
      take(1),
      map(buckets => this.getUniqueOptions(Object.values(buckets[0].data.user))),
      takeUntil(this.destroy$),
    );

    this.uniqueOptions$.pipe(
      take(1),
    ).subscribe(uniqueOptions => this.filterByOption$.next(uniqueOptions[0]));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // getValuesMatchingFilter(buckets: ITimeBucket<IBasicResponse<IStatisticItem[]>>[], filter: string, origin: EDataOrigin): number[] {
  //   let originData: IStatisticItem[];

  //   if (origin === EDataOrigin.USER) {
  //     originData = flatten(buckets.map(bucket => bucket.data.user));
  //   }
  //   else {
  //     originData = flatten(buckets.map(bucket => bucket.data.compare));
  //   }

  //   return originData
  //     .filter((data: IStatisticItem) => (!filter || data.option === filter))
  //     .map(data => data.value);
  // }

  getValuesMatchingFilter(buckets: ITimeBucket<IBasicResponse<IStatisticsWeek>>[], filter: string, origin: EDataOrigin): number[] {    
    let originData: IStatisticsWeek;

    if (origin === EDataOrigin.USER) {
      originData = buckets[0].data.user;
    }
    else {
      originData = buckets[0].data.compare;
    }

    const monday: IStatisticItem = originData.monday.find(x => x.option === filter);
    const tuesday: IStatisticItem = originData.tuesday.find(x => x.option === filter);
    const wednesday: IStatisticItem = originData.wednesday.find(x => x.option === filter);
    const thursday: IStatisticItem = originData.thursday.find(x => x.option === filter);
    const friday: IStatisticItem = originData.friday.find(x => x.option === filter);
    const saturday: IStatisticItem = originData.saturday.find(x => x.option === filter);
    const sunday: IStatisticItem = originData.sunday.find(x => x.option === filter);

    return [
      monday ? monday.value : 0,
      tuesday ? tuesday.value : 0,
      wednesday ? wednesday.value : 0,
      thursday ? thursday.value : 0,
      friday ? friday.value : 0,
      saturday ? saturday.value : 0,
      sunday ? sunday.value : 0,
    ];
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
