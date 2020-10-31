import { Component } from '@angular/core';
import { ECategory, IChartItem, IRange } from '@shared/types';
import { EColorStyle } from '../../charts/pie-chart/pie-chart.component';
import { StatisticsDataAccessService } from '../../../data-access/statistics-data-access.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-stress-pie',
  templateUrl: './stress-pie.component.html',
  styleUrls: ['./stress-pie.component.scss']
})
export class StressPieComponent {

  constructor(private statisticsDataAccessService: StatisticsDataAccessService) { }

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
    ).subscribe((data: IChartItem[]) => {
      console.log(data);
      this.options = data.map(x => x.option);
      this.values1 = data.map(x => x.value);
    });
  }






}
