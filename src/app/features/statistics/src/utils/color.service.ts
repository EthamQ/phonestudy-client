import { Injectable } from '@angular/core';
import { EDataOrigin } from '../types/types';

export enum EColor {
  GREEN_DARK = '#0b6f0f',
  GREEN_MIDDLE = '#11aa17',
  GREEN_LIGHT = '#58da5d',
  RED_DARK = '#e81809',
  RED_MIDDLE = '#ec5348',
  RED_LIGHT = '#f27a72',
}

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  getColorForPositivity(positivity: number): EColor {
    switch (positivity) {
      case 6:
        return EColor.GREEN_DARK;
      case 5:
        return EColor.GREEN_MIDDLE;
      case 4:
        return EColor.GREEN_LIGHT;
      case 3:
        return EColor.RED_LIGHT;
      case 2:
        return EColor.RED_MIDDLE;
      case 1:
        return EColor.RED_DARK;
    }
  }

  getChartColor(origin: EDataOrigin) {
    switch (origin) {
      case EDataOrigin.USER:
        return '#07c';
      case EDataOrigin.COMPARE:
        return 'orange';
    }
  }

}
