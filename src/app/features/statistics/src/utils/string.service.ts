import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringService {

  getUniqueStrings(strings: string[]): string[] {
    const set = new Set<string>();
    strings.forEach(s => {
      set.add(s);
    });
    return Array.from(set);
  }
  
}
