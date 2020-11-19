import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ECategory } from '@shared/types';

@Component({
  selector: 'app-category-card-multi',
  templateUrl: './category-card-multi.component.html',
  styleUrls: ['./category-card-multi.component.scss']
})
export class CategoryCardMultiComponent implements OnChanges {

  @Input() categories: ECategory[] = [];
  @Input() clickable = true;

  imageSrcMain = '';
  imageSrcs = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.categories && this.categories) {
      this.imageSrcMain = this.getImageSrc(this.categories[0]);
      const smallImages = this.categories.slice(1, this.categories.length);
      this.imageSrcs = smallImages.map(x => this.getImageSrc(x));
    }
  }

  getImageSrc(category: ECategory): string {
    const basePath = '/assets/card-icons/';
    return `${basePath}${category}.svg`;
  }

}
