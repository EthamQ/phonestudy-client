import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'phonestudy-client';

  startLinkVisible = false;

  constructor(public router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if(!event.url) {
        return;
      }
      this.startLinkVisible = event.url !== '/start';
    });
  }
}
