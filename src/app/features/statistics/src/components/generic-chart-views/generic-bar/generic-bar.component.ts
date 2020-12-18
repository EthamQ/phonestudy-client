import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { IStatisticItem, IStatisticsWeek } from '@shared/types/server';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { flatten } from 'underscore';
import { GenericChartComponent } from '../generic-chart/generic-chart.component';
import { Input } from '@angular/core';
import { StringService } from '../../../utils/string.service';

@Component({
  selector: 'app-generic-bar',
  templateUrl: './generic-bar.component.html',
  styleUrls: ['./generic-bar.component.scss'],
})
export class GenericBarComponent extends GenericChartComponent implements OnInit, OnDestroy {

  @Input() data1: IStatisticsWeek;
  @Input() data2: IStatisticsWeek;

  filterByOption$: Subject<string> = new Subject<string>();
  destroy$: Subject<void> = new Subject<void>();

  uniqueOptions: string[];
  xAxis = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  yAxis1: number[];
  yAxis2: number[];

  constructor(
    private stringService: StringService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.filterByOption$.pipe(takeUntil(this.destroy$))
    .subscribe((filter: string) => {
      this.yAxis1 = this.getValuesMatchingFilter(this.data1, filter);

      if(this.data2) {
        this.yAxis2 = this.getValuesMatchingFilter(this.data2, filter);
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
    this.filterByOption$.next(option);
  }

  private getUniqueOptions(items: IStatisticItem[]): string[] {
    return this.stringService.getUniqueStrings(
      items.map(x => x.option),
    );
  }

}
