import { Component, Input, OnInit } from '@angular/core';
import { ECategory } from '@shared/types';
import { ITimeBucket, IBasicResponse, IRequestPayloadScatter, ICorrelation } from '@shared/types/server';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { StatisticsDataAccessService } from '../../../data-access/services/statistics-data-access.service';
import { ApplicationInfoService } from '@shared/services';
import { ActivatedRoute } from '@angular/router';

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

  timebucket$: ReplaySubject<ITimeBucket<IBasicResponse<ICorrelation>>> = new ReplaySubject();
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
    private applicationInfoService: ApplicationInfoService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const compareWith: 'none' | 'all' | 'demographic' = this.applicationInfoService.getCompareWith(this.activatedRoute.pathFromRoot);
    this.comparisonActive = compareWith !== 'none';

    this.statisticsDataAccessService.getScatterChartData(
      this.endpoint,
      { ...this.payload, compareWith },
    ).pipe(
      take(1),
      map(timeBuckets => timeBuckets[0]),
    ).subscribe(x => this.timebucket$.next(x));

    this.dataUser$ = this.timebucket$.pipe(
      map(timeBucket => timeBucket.data.user),
      take(1),
    );

    this.dataCompare$ = this.timebucket$.pipe(
      take(1),
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
