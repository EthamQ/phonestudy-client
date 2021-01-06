import { Pipe, PipeTransform } from '@angular/core';
import { ECategory } from '@shared/types';

@Pipe({
  name: 'categoryText'
})
export class CategoryTextPipe implements PipeTransform {

  transform(category: ECategory): string {
    switch (category) {
      case ECategory.STRESS:
        return 'Stress';
      case ECategory.MOOD:
        return 'Gefühlszustand';
      case ECategory.SLEEP:
        return 'Schlafqualität';
      case ECategory.COMMUNICATION:
        return 'Kommunikation';
      case ECategory.APP:
        return 'App Benutzung';;
    }
  }

}
