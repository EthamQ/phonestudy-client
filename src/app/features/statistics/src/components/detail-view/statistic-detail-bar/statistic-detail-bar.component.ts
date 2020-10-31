import { Component, Input, OnInit } from '@angular/core';
import { ECategory, IRange } from '@shared/types';
import { EColorStyle } from '../../categories/charts/pie-chart/pie-chart.component';

@Component({
  selector: 'app-statistic-detail-bar',
  templateUrl: './statistic-detail-bar.component.html',
  styleUrls: ['./statistic-detail-bar.component.scss']
})
export class StatisticDetailBarComponent {

  @Input() category: ECategory;
  @Input() dateRange: IRange<string>;
  @Input() options: string;
  @Input() values1: number[];
  @Input() values2: number[];
  @Input() colorStyle: EColorStyle;

}
