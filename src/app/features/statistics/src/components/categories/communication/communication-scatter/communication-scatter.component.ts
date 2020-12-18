import { Component } from '@angular/core';
import { DateService } from '@shared/services';
import { ECategory } from '@shared/types';
import { StatisticsDataAccessService } from 'app/features/statistics/src/data-access/services/statistics-data-access.service';
import { environment } from 'environments/environment';
import { GenericScatterComponent } from '../../../generic-chart-views/generic-scatter/generic-scatter.component';
import { CorrelationCalculationService } from '../../../../utils/correlation-calculation.service';
import { ColorService } from '../../../../utils/color.service';
import { StringService } from 'app/features/statistics/src/utils/string.service';
import { CategoryService } from 'app/features/statistics/src/utils/category.service';

@Component({
  selector: 'app-communication-scatter',
  templateUrl: '../../../generic-chart-views/generic-scatter/generic-scatter.component.html',
  styleUrls: ['../../../generic-chart-views/generic-scatter/generic-scatter.component.scss'],
})
export class CommunicationScatterComponent extends GenericScatterComponent {

  constructor(
    statisticsDataAccessService: StatisticsDataAccessService,
    dateService: DateService,
    correlationCalculationService: CorrelationCalculationService,
    colorService: ColorService,
    stringService: StringService,
    categoryService: CategoryService,
  ) {
    super(
      statisticsDataAccessService,
      dateService,
      correlationCalculationService,
      colorService,
      stringService,
      categoryService,
    );
    this.categories = [
      ECategory.COMMUNICATION,
      ECategory.STRESS,
      ECategory.MOOD,
      ECategory.SLEEP
    ];

    this.comparisonActive = environment.compareWith !== 'none';

    this.urlSuffix = 'communication';

    this.textX = 'Minuten telefoniert';

    this.description = 'Korrelation Minuten telefoniert und';

    this.requestPayload = {
      compareWith: environment.compareWith,
      type: 'correlation',
      aggregation: 'total & average',
    };

  }

}
