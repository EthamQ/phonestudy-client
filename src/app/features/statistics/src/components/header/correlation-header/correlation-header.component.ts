import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ECategory } from '@shared/types';

@Component({
  selector: 'app-correlation-header',
  templateUrl: './correlation-header.component.html',
  styleUrls: ['./correlation-header.component.scss']
})
export class CorrelationHeaderComponent implements OnChanges {

  @Input() categories: ECategory[];
  @Input() selectedCategory: ECategory;
  @Input() date: string;

  @Output() categoryClicked = new EventEmitter<ECategory>();

  categoryLeft: ECategory;
  categoriesRight: ECategory[];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.categories && this.categories) {
      this.categoryLeft = this.categories[0];
      this.categoriesRight = this.categories.slice(1, 4);
    }
  }

  onCategoryClicked(category: ECategory): void  {
    this.categoryClicked.emit(category);
  }

}
