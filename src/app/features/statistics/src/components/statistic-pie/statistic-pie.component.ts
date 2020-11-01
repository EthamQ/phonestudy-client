import { Component, Input } from '@angular/core';
import { ECategory, IRange } from '@shared/types';
import { EColorStyle } from '../charts';


@Component({
  selector: 'app-statistic-detail-pie',
  templateUrl: './statistic-pie.component.html',
  styleUrls: ['./statistic-pie.component.scss']
})
export class StatisticDetailPieComponent {
  @Input() category: ECategory;
  @Input() dateRange: IRange<string>;
  @Input() options: string[];
  @Input() values1: number[];
  @Input() values2: number[];
  @Input() colorStyle: EColorStyle;
}
