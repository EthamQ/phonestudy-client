import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryCardComponent } from './components/category-card/category-card.component';

@NgModule({
  imports: [CommonModule],
    declarations: [
      CategoryCardComponent
    ],
    exports: [CategoryCardComponent],
    providers: [],
  })
  export class SharedUiModule { }
  