import { Component } from '@angular/core';
import { ECategory, IRange } from '@shared/types';
import { EColorStyle } from '../../../charts';
import { StatisticsDataAccessService } from '../../../../data-access/services/statistics-data-access.service';
import { IChartItems } from '@shared/types/chart';

@Component({
  selector: 'app-stress-pie',
  templateUrl: './stress-pie.component.html',
  styleUrls: ['./stress-pie.component.scss']
})
export class StressPieComponent {

  constructor(
    private statisticsDataAccessService: StatisticsDataAccessService,
    ) { }

  options: string[];
  values1: number[];
  values2: number[];

  category = ECategory.STRESS;
  colorStyle = EColorStyle.DESCENDING;

  dateRange: IRange<string> = {
    from: '2020-07-01',
    to: '2020-07-10',
  }

  ngOnInit(): void {
    this.statisticsDataAccessService.getStatistics(
      this.category,
      this.dateRange.from,
      this.dateRange.to,
    ).subscribe((data: IChartItems) => {
      this.options = data.options;
      this.values1 = data.values;
    });
  }






}
