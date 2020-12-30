import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-correlation-info',
  templateUrl: './correlation-info.component.html',
  styleUrls: ['./correlation-info.component.scss']
})
export class CorrelationInfoComponent {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() explanation: string;
  @Input() correlationValue: number;
  @Input() pointText: string;
  @Input() pointColor: string = 'black';
  @Input() placeholder: string;

}
