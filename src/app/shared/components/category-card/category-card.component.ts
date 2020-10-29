import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ECategory } from '../../types/category.type';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnChanges {

  @Input() category: ECategory;
  @Input() clickable = true;

  imageSrc = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.category) {
      this.imageSrc = this.getImageSrc(this.category);
    }
  }

  getImageSrc(category: ECategory): string {
    const basePath = '/assets/card-icons/';
    switch (category) {
      case ECategory.STRESS:
        return `${basePath}stress.svg`
      case ECategory.MOOD:
        return `${basePath}mood.svg`
      case ECategory.SLEEP:
        return `${basePath}sleep.svg`
      case ECategory.COMMUNICATION:
        return `${basePath}communication.svg`
      case ECategory.WORDS:
        return `${basePath}words.svg`
      case ECategory.APP:
        return `${basePath}app.svg`
    }
  }

}
