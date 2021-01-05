import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { IRequestPayloadBar } from '@shared/types/server';
import { CategoryService } from 'app/features/statistics/src/utils/category.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-mood-bar',
  templateUrl: './mood-bar.component.html',
})
export class MoodBarComponent {

  constructor(private categoryService: CategoryService) {}

  description = 'Verteilung Gefühlszustand pro Wochentag';
  textY = `${this.categoryService.getDisplayName(ECategory.MOOD)}; ${this.categoryService.getAxisExplanation(ECategory.MOOD)}`;
  category = ECategory.MOOD;
  endpoint = 'mood';
  payload: IRequestPayloadBar = {
    compareWith: environment.compareWith,
    type: 'simple',
    aggregation: 'average-by-weekday',
  };

}
