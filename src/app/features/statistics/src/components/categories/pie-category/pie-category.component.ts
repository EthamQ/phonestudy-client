import { Component, Input, OnInit } from '@angular/core';
import { ECategory } from '@shared/types';
import { ITimeBucket, IBasicResponse, IStatisticItem, IRequestPayloadPie } from '@shared/types/server';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatisticsDataAccessService } from '../../../data-access/services/statistics-data-access.service';
import { EColorStyle } from '../../charts';

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

  timebucket$: Observable<ITimeBucket<IBasicResponse<IStatisticItem[]>>>;
  dataUser$: Observable<IStatisticItem[]>;
  dataCompare$: Observable<IStatisticItem[]>;

  chartTitle1: string;
  chartTitle2: string;

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
  ) { }

  ngOnInit() {
    this.timebucket$ = this.statisticsDataAccessService.getPieChartData(
      this.endpoint,
      this.payload,
    ).pipe(
      map(timeBuckets => timeBuckets[0]),
    );

    this.dataUser$ = this.timebucket$.pipe(
      map(timeBucket => timeBucket.data.user),
    );

    this.dataCompare$ = this.timebucket$.pipe(
      map(timeBucket => {
        const dataCompare: IStatisticItem[] = timeBucket.data.compare;

        switch (environment.compareWith) {
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