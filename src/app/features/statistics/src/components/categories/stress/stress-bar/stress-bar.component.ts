import { Component } from '@angular/core';
import { ECategory } from '@shared/types';
import { IRequestPayloadBar } from '@shared/types/server';
import { environment } from 'environments/environment';
import { CategoryService } from '../../../../utils/category.service';

@Component({
  selector: 'app-stress-bar',
  templateUrl: './stress-bar.component.html',
})
export class StressBarComponent {

  constructor(private categoryService: CategoryService) {}

  description = 'Verteilung Stresslevel pro Wochentag';
  textY = this.categoryService.getAxisExplanation(ECategory.STRESS);
  category = ECategory.STRESS;
  endpoint = 'stress';
  payload: IRequestPayloadBar = {
    compareWith: environment.compareWith,
    type: 'simple',
    aggregation: 'average-by-weekday',
  };

}
