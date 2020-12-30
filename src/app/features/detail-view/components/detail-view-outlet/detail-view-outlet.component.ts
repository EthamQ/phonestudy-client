import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-view-outlet',
  templateUrl: './detail-view-outlet.component.html',
  styleUrls: ['./detail-view-outlet.component.scss']
})
export class DetailViewOutletComponent {

  constructor(private router: Router) {}

  onClickHome(): void {
    this.router.navigate(['/' + this.router.url.split('/').filter(x => !!x)[0]]);
  }

}
