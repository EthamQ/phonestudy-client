import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoryTextPipe } from './pipes/category-text.pipe';
import { DateRangePipe } from './pipes/date-range.pipe';

@NgModule({
  imports: [CommonModule],
    declarations: [
      CategoryCardComponent,
      CategoryTextPipe,
      DateRangePipe,
    ],
    exports: [CategoryCardComponent, CategoryTextPipe, DateRangePipe],
    providers: [],
  })
  export class SharedModule { }
  