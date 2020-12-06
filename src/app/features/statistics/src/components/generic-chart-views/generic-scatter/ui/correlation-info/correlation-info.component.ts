import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-correlation-info',
  templateUrl: './correlation-info.component.html',
  styleUrls: ['./correlation-info.component.scss']
})
export class CorrelationInfoComponent implements OnInit {

  @Input() title: string;
  @Input() explanation: string;
  @Input() correlationValue: number;
  @Input() pointText: string;
  @Input() pointColor: string = 'black';

  constructor() { }

  ngOnInit(): void {
  }

}
