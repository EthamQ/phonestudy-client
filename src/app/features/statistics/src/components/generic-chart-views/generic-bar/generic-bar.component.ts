import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { IStatisticItem, IStatisticsWeek } from '@shared/types/server';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { flatten } from 'underscore';
import { GenericChartComponent } from '../generic-chart/generic-chart.component';
import { Input } from '@angular/core';
import { StringService } from '../../../utils/string.service';
import { ColorService } from '../../../utils/color.service';
import { EDataOrigin } from '../../../types/types';
import { CustomGoogleAnalyticsService, EGaEventAction } from '@shared/services/custom-google-analytics.service';

@Component({
  selector: 'app-generic-bar',
  templateUrl: './generic-bar.component.html',
  styleUrls: ['./generic-bar.component.scss'],
})
export class GenericBarComponent extends GenericChartComponent implements OnInit, OnDestroy {

  @Input() data1: IStatisticsWeek;
  @Input() data2: IStatisticsWeek;
  @Input() chartTitle1: string;
  @Input() chartTitle2: string;
  @Input() textY: string;

  filterByOption$: ReplaySubject<string> = new ReplaySubject<string>(1);
  destroy$: Subject<void> = new Subject<void>();

  uniqueOptions: string[];
  xAxis = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  yAxis1: number[];
  yAxis2: number[];

  yAxis1IsEmpty: boolean;
  yAxis2IsEmpty: boolean;

  color1 = this.colorService.getChartColor(EDataOrigin.USER);
  color2 = this.colorService.getChartColor(EDataOrigin.COMPARE);

  constructor(
    private stringService: StringService,
    private colorService: ColorService,
    private googleAnalyticsService: CustomGoogleAnalyticsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.filterByOption$.pipe(takeUntil(this.destroy$))
    .subscribe((filter: string) => {
      this.yAxis1 = this.getValuesMatchingFilter(this.data1, filter);
      this.yAxis1IsEmpty = this.yAxis1.every(x => x < 1);

      if(this.data2) {
        this.yAxis2 = this.getValuesMatchingFilter(this.data2, filter);
        this.yAxis2IsEmpty = this.yAxis2.every(x => x < 1);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if((changes.data1 || changes.data2) && this.data1) {
      this.uniqueOptions = this.getUniqueOptions(flatten(Object.values(this.data1)));      
      this.filterByOption$.next(this.uniqueOptions[0]);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getValuesMatchingFilter(week: IStatisticsWeek, filter: string): number[] {    
    const monday: IStatisticItem = week.monday.find(x => x.option === filter);
    const tuesday: IStatisticItem = week.tuesday.find(x => x.option === filter);
    const wednesday: IStatisticItem = week.wednesday.find(x => x.option === filter);
    const thursday: IStatisticItem = week.thursday.find(x => x.option === filter);
    const friday: IStatisticItem = week.friday.find(x => x.option === filter);
    const saturday: IStatisticItem = week.saturday.find(x => x.option === filter);
    const sunday: IStatisticItem = week.sunday.find(x => x.option === filter);

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
    this.googleAnalyticsService.sendGaEvent(EGaEventAction.CLICK_DROPDOWN, option);
    this.filterByOption$.next(option);
  }

  private getUniqueOptions(items: IStatisticItem[]): string[] {
    return this.stringService.getUniqueStrings(
      items.map(x => x.option),
    );
  }

}
