import { Component, Input } from '@angular/core';
import { ECategory, IRange } from '@shared/types';
import { EColorStyle } from '../../categories/charts/pie-chart/pie-chart.component';


@Component({
  selector: 'app-statistic-detail-pie',
  templateUrl: './statistic-detail-pie.component.html',
  styleUrls: ['./statistic-detail-pie.component.scss']
})
export class StatisticDetailPieComponent {
  @Input() category: ECategory;
  @Input() dateRange: IRange<string>;
  @Input() options: string;
  @Input() values1: number[];
  @Input() values2: number[];
  @Input() colorStyle: EColorStyle;
}
