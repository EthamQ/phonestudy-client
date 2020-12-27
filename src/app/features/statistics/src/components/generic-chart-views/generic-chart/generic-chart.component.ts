import { Component, Input } from '@angular/core';
import { ECategory } from '@shared/types';
import { IRequestPayload } from '@shared/types/server';

@Component({
  selector: 'app-generic-chart',
  template: '',
  styleUrls: [],
})
export class GenericChartComponent {
  @Input() description: string;
  @Input() comparisonActive: boolean;
  @Input() category: ECategory;
  @Input() dateFrom: string;
  @Input() dateTo: string;
}
