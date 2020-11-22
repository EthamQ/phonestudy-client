import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ECategory } from '@shared/types';

@Component({
  selector: 'app-correlation-header',
  templateUrl: './correlation-header.component.html',
  styleUrls: ['./correlation-header.component.scss']
})
export class CorrelationHeaderComponent implements OnChanges {

  @Input() categories: ECategory[];
  @Input() date: string;

  categoryLeft: ECategory;
  categoriesRight: ECategory[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.categories && this.categories) {
      this.categoryLeft = this.categories[0];
      this.categoriesRight = this.categories.slice(1, 4);
    }
  }

}
