import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent {

  @Input() pointColor: string = 'black';

}
