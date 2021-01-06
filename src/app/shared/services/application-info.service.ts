import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApplicationInfoService {

  constructor(private router: Router) {}

  getCompareWith(pathFromRoot: ActivatedRoute[]): 'none' | 'all' | 'demographic' {
    const compareWithRoute: ActivatedRoute = pathFromRoot.find(x => x.routeConfig && x.routeConfig.data && x.routeConfig.data.compareWith)
    return compareWithRoute ? compareWithRoute.routeConfig.data.compareWith : 'none';
  }

  getCurrentRoute(): string {
    return this.router.url;
  }
}
