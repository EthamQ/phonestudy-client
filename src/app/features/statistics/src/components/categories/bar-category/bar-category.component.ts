import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ECategory } from '@shared/types';
import { ITimeBucket, IBasicResponse, IRequestPayloadBar, IStatisticsWeek } from '@shared/types/server';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatisticsDataAccessService } from '../../../data-access/services/statistics-data-access.service';
import { EColorStyle } from '../../charts';

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

  timebucket$: Observable<ITimeBucket<IBasicResponse<IStatisticsWeek>>>;
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
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const compareWithRoute: ActivatedRoute = this.activatedRoute.pathFromRoot.find(x => x.routeConfig && x.routeConfig.data && x.routeConfig.data.compareWith)
    const compareWith: 'none' | 'all' | 'demographic' = compareWithRoute ? compareWithRoute.routeConfig.data.compareWith : 'none';

    this.timebucket$ = this.statisticsDataAccessService.getBarChartData(
      this.endpoint,
      { ...this.payload, compareWith },
    ).pipe(
      map(timeBuckets => timeBuckets[0]),
    );

    this.dataUser$ = this.timebucket$.pipe(
      map(timeBucket => timeBucket.data.user),
    );

    this.dataCompare$ = this.timebucket$.pipe(
      map(timeBucket => {
        const dataCompare: IStatisticsWeek = timeBucket.data.compare;

        switch (compareWith) {
          case 'none':
            return null;
          case 'all':
            this.chartTitle1 = 'Du';
            this.chartTitle2 = 'Alle anderen Teilnehmer';
            return dataCompare || this.statisticWeekEmpty;
          case 'demographic':
            this.chartTitle1 = 'Du';
            this.chartTitle2 = 'Alle Teilnehmer in deinem Alter (+-1)';
            return dataCompare || this.statisticWeekEmpty;
        }

      }),
    );
  }

}
