import { Injectable } from '@angular/core';


export enum ELocalStorageKey {
  USERID = 'userId',
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor() { }

  set(key:ELocalStorageKey, value: string) {
    localStorage.setItem(key, value);
  }

  get(key:ELocalStorageKey): string {
    return localStorage.getItem(key);
  }
}
