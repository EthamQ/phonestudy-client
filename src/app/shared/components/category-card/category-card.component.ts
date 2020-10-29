import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ECategory } from '@shared/types/category.type';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnChanges {

  @Input() category: ECategory;

  imageSrc = '';

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.category) {
      this.imageSrc = this.getImageSrc(this.category);
    }
  }

  getImageSrc(category: ECategory) {
    const basePath = '/assets/card-icons/';
    switch(category) {
      case ECategory.STRESS:
        return `${basePath}stress.svg`
    }

  }

}
