import { Injectable } from '@angular/core';
import { EDataOrigin } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  getChartColor(origin: EDataOrigin) {
    switch (origin) {
      case EDataOrigin.USER:
        return '#07c';
      case EDataOrigin.COMPARE:
        return 'orange';
    }

  }
}
