import { Component, Input, OnInit } from '@angular/core';
import { ECategory } from '@shared/types';
import { ITimeBucket, IBasicResponse, IRequestPayloadBar, IStatisticsWeek } from '@shared/types/server';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { StatisticsDataAccessService } from '../../../data-access/services/statistics-data-access.service';
import { EColorStyle } from '../../charts';
import { ApplicationInfoService } from '@shared/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bar-category',
  templateUrl: './bar-category.component.html',
  styleUrls: ['./bar-category.component.scss']
})
export class BarCategoryComponent implements OnInit {

  @Input() description: string;
  @Input() colorStyle: EColorStyle;
  @Input() category: ECategory;
  @Input() payload: IRequestPayloadBar;
  @Input() endpoint: string;
  @Input() textY: string;

  timebucket$: ReplaySubject<ITimeBucket<IBasicResponse<IStatisticsWeek>>> = new ReplaySubject();
  dataUser$: Observable<IStatisticsWeek>;
  dataCompare$: Observable<IStatisticsWeek>;

  chartTitle1: string;
  chartTitle2: string;

  get statisticWeekEmpty(): IStatisticsWeek {
    return {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    }
  }

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private applicationInfoService: ApplicationInfoService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const compareWith: 'none' | 'all' | 'demographic' = this.applicationInfoService.getCompareWith(this.activatedRoute.pathFromRoot);

    this.statisticsDataAccessService.getBarChartData(
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
        const dataCompare: IStatisticsWeek = timeBucket.data.compare;

        switch (compareWith) {
          case 'none':
            return null;
          case 'all':
            this.chartTitle1 = 'Du';
            this.chartTitle2 = 'Alle anderen Teilnehmer (Durchschnitt)';
            return dataCompare || this.statisticWeekEmpty;
          case 'demographic':
            this.chartTitle1 = 'Du';
            this.chartTitle2 = 'Alle Teilnehmer in deinem Alter (+-1) (Durchschnitt)';
            return dataCompare || this.statisticWeekEmpty;
        }
      }),
    );
  }

}
