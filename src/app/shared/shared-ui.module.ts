import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoryTextPipe } from './pipes/category-text.pipe';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { DateRangePipe } from './pipes/date-range.pipe';

@NgModule({
  imports: [CommonModule],
    declarations: [
      CategoryCardComponent,
      CategoryTextPipe,
      DetailViewComponent,
      DateRangePipe,
    ],
    exports: [CategoryCardComponent, CategoryTextPipe, DetailViewComponent, DateRangePipe],
    providers: [],
  })
  export class SharedModule { }
  