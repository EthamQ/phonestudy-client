import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ELocalStorageKey, LocalStorageService } from '@shared/services/local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsUserKnownGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!!this.localStorageService.get(ELocalStorageKey.USERID)) {
      return true;
    }

    return false;
  }

}
