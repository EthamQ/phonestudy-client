import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ECategory } from '@shared/types';
import { ITimeBucket, IBasicResponse, IRequestPayloadScatter, ICorrelation } from '@shared/types/server';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatisticsDataAccessService } from '../../../data-access/services/statistics-data-access.service';

@Component({
  selector: 'app-scatter-category',
  templateUrl: './scatter-category.component.html',
  styleUrls: ['./scatter-category.component.scss']
})
export class ScatterCategoryComponent implements OnInit {

  @Input() description: string;
  @Input() categories: ECategory[];
  @Input() payload: IRequestPayloadScatter;
  @Input() endpoint: string;
  @Input() textX: string;
  @Input() multipleOptions: boolean;

  timebucket$: Observable<ITimeBucket<IBasicResponse<ICorrelation>>>;
  dataUser$: Observable<ICorrelation>;
  dataCompare$: Observable<ICorrelation>;

  chartTitle1: string;
  chartTitle2: string;
  comparisonActive: boolean;

  get emptyCorrelation(): ICorrelation {
    return {
      option: '',
      stress: [],
      mood: [],
      sleep: [],
    }
  }

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const compareWithRoute: ActivatedRoute = this.activatedRoute.pathFromRoot.find(x => x.routeConfig && x.routeConfig.data && x.routeConfig.data.compareWith)
    const compareWith: 'none' | 'all' | 'demographic' = compareWithRoute ? compareWithRoute.routeConfig.data.compareWith : 'none';
    this.comparisonActive = compareWith !== 'none';

    this.timebucket$ = this.statisticsDataAccessService.getScatterChartData(
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
        const dataCompare: ICorrelation = timeBucket.data.compare;

        switch (compareWith) {
          case 'none':
            this.chartTitle1 = 'Du';
            return null;
          case 'all':
            this.chartTitle1 = 'Du';
            this.chartTitle2 = 'Alle anderen Teilnehmer';
            return dataCompare || this.emptyCorrelation;
          case 'demographic':
            this.chartTitle1 = 'Du';
            this.chartTitle2 = 'Alle Teilnehmer in deinem Alter (+-1)';
            return dataCompare || this.emptyCorrelation;
        }

      }),
    );
  }

}
