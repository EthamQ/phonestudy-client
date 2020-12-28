import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryCardComponent } from './components/category-cards/category-card/category-card.component';
import { CategoryTextPipe } from './pipes/category-text.pipe';
import { DateRangePipe } from './pipes/date-range.pipe';
import { CategoryCardMultiComponent } from './components/category-cards/category-card-multi/category-card-multi.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { PointComponent } from './components/point/point.component';

@NgModule({
  imports: [CommonModule, MatProgressBarModule,],
    declarations: [
      CategoryCardComponent,
      CategoryTextPipe,
      DateRangePipe,
      CategoryCardMultiComponent,
      LoadingScreenComponent,
      DateFormatPipe,
      PointComponent,
    ],
    exports: [
      CategoryCardComponent,
      CategoryCardMultiComponent,
      CategoryTextPipe,
      DateRangePipe,
      LoadingScreenComponent,
      DateFormatPipe,
      PointComponent,
    ],
    providers: [],
  })
  export class SharedModule { }
  