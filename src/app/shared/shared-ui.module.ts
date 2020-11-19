import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryCardComponent } from './components/category-cards/category-card/category-card.component';
import { CategoryTextPipe } from './pipes/category-text.pipe';
import { DateRangePipe } from './pipes/date-range.pipe';
import { CategoryCardMultiComponent } from './components/category-cards/category-card-multi/category-card-multi.component';

@NgModule({
  imports: [CommonModule],
    declarations: [
      CategoryCardComponent,
      CategoryTextPipe,
      DateRangePipe,
      CategoryCardMultiComponent,
    ],
    exports: [CategoryCardComponent, CategoryCardMultiComponent, CategoryTextPipe, DateRangePipe],
    providers: [],
  })
  export class SharedModule { }
  