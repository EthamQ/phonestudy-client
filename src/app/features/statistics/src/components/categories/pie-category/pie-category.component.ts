import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ECategory } from '@shared/types';
import { ITimeBucket, IBasicResponse, IStatisticItem, IRequestPayloadPie } from '@shared/types/server';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { StatisticsDataAccessService } from '../../../data-access/services/statistics-data-access.service';
import { EColorStyle } from '../../charts';
import { CustomGoogleAnalyticsService } from '../../../../../../shared/services/custom-google-analytics.service';

@Component({
  selector: 'app-pie-category',
  templateUrl: './pie-category.component.html',
  styleUrls: ['./pie-category.component.scss']
})
export class PieCategoryComponent implements OnInit {

  @Input() description: string;
  @Input() colorStyle: EColorStyle;
  @Input() category: ECategory;
  @Input() payload: IRequestPayloadPie;
  @Input() endpoint: string;

  timebucket$: ReplaySubject<ITimeBucket<IBasicResponse<IStatisticItem[]>>> = new ReplaySubject();
  dataUser$: Observable<IStatisticItem[]>;
  dataCompare$: Observable<IStatisticItem[]>;

  chartTitle1: string;
  chartTitle2: string;

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private activatedRoute: ActivatedRoute,
    private googleAnalyticsService: CustomGoogleAnalyticsService,
  ) { }

  ngOnInit() {
    const compareWithRoute: ActivatedRoute = this.activatedRoute.pathFromRoot.find(x => x.routeConfig && x.routeConfig.data && x.routeConfig.data.compareWith)
    const compareWith: 'none' | 'all' | 'demographic' = compareWithRoute ? compareWithRoute.routeConfig.data.compareWith : 'none';
    
    this.googleAnalyticsService.sendChartVisitEvent('pie', compareWith, this.category);
    
    this.statisticsDataAccessService.getPieChartData(
      this.endpoint,
      { ...this.payload, compareWith },
    ).pipe(
      take(1),
      map(timeBuckets => timeBuckets[0]),
    ).subscribe(x => this.timebucket$.next(x));

    this.dataUser$ = this.timebucket$.pipe(
      take(1),
      map(timeBucket => timeBucket.data.user),
    );

    this.dataCompare$ = this.timebucket$.pipe(
      take(1),
      map(timeBucket => {
        const dataCompare: IStatisticItem[] = timeBucket.data.compare;

        switch (compareWith) {
          case 'none':
            return null;
          case 'all':
            this.chartTitle1 = 'Du';
            this.chartTitle2 = 'Alle anderen Teilnehmer';
            return dataCompare || [];
          case 'demographic':
            this.chartTitle1 = 'Du';
            this.chartTitle2 = 'Alle Teilnehmer in deinem Alter (+-1)';
            return dataCompare || [];
        }

      }),
    );
  }

}
