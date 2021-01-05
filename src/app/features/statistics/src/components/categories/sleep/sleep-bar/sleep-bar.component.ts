import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { IRequestPayloadBar } from '@shared/types/server';
import { environment } from 'environments/environment';
import { CategoryService } from '../../../../utils/category.service';

@Component({
  selector: 'app-sleep-bar',  templateUrl: './sleep-bar.component.html',
})
export class SleepBarComponent {

  constructor(private categoryService: CategoryService) {}

  description = 'Verteilung Schlafqualität pro Wochentag';
  textY = `${this.categoryService.getDisplayName(ECategory.SLEEP)}; ${this.categoryService.getAxisExplanation(ECategory.SLEEP)}`;
  category = ECategory.SLEEP;
  endpoint = 'sleep';
  payload: IRequestPayloadBar = {
    compareWith: environment.compareWith,
    type: 'simple',
    aggregation: 'average-by-weekday',
  };

}
