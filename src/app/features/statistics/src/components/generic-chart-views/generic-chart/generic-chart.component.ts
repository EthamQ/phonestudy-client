import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { IRequestPayload } from '@shared/types/server';

@Component({
  selector: 'app-generic-chart',
  template: '',
  styleUrls: [],
})
export class GenericChartComponent<T extends IRequestPayload> {
  comparisonActive: boolean;
  description = '';
  category: ECategory;
  urlSuffix: string;
  dateFrom: string;
  dateTo: string;
  requestPayload: T;
}
