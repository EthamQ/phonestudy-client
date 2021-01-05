import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ELocalStorageKey, LocalStorageService } from '@shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userId: string = next.params.userId;
    const baseUrl = '/' + state.url.split('/').filter(x => !!x)[0];

    if (userId) {
      this.localStorageService.set(ELocalStorageKey.USERID, userId);
      return this.router.parseUrl(baseUrl);
    }

    if (!userId && !!this.localStorageService.get(ELocalStorageKey.USERID)) {
      return this.router.parseUrl(baseUrl);
    }

    return false;
  }

}
