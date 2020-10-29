import { Component, Input, OnInit } from '@angular/core';
import { ECategory } from '@shared/types/category.type';

@Component({
  selector: 'app-statistic-header',
  templateUrl: './statistic-header.component.html',
  styleUrls: ['./statistic-header.component.scss']
})
export class StatisticHeaderComponent implements OnInit {

  @Input() category: ECategory;

  constructor() { }

  ngOnInit(): void {
  }

}
