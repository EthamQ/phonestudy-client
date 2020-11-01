import { Component, Input } from '@angular/core';
import { ECategory, IRange } from '@shared/types';
import { EColorStyle } from '../charts';

@Component({
  selector: 'app-statistic-detail-bar',
  templateUrl: './statistic-bar.component.html',
  styleUrls: ['./statistic-bar.component.scss']
})
export class StatisticDetailBarComponent {

  @Input() category: ECategory;
  @Input() dateRange: IRange<string>;
  @Input() options: string;
  @Input() values1: number[];
  @Input() values2: number[];
  @Input() colorStyle: EColorStyle;

}
