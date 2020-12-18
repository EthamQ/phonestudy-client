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

}
