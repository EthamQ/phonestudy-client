import { Injectable } from '@angular/core';
import { ECategory } from '../../../../shared/types/category.type';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  getDisplayName(category: ECategory) {
    switch (category) {
      case ECategory.STRESS:
        return 'Stresslevel';
      case ECategory.MOOD:
        return 'Gefühlszustand';
      case ECategory.SLEEP:
        return 'Schlafqualität';
    }
  }

  getAxisExplanation(category: ECategory) {
    switch (category) {
      case ECategory.STRESS:
        return '1 (sehr entspannt) - 6 (sehr gestresst)';
      case ECategory.MOOD:
        return '1 (sehr angenehm) - 6 (sehr unangenehm)';
      case ECategory.SLEEP:
        return '1 (sehr gut) - 6 (sehr schlecht)';
    }
  }

}
