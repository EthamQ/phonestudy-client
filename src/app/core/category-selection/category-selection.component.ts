import { Component, OnInit } from '@angular/core';
import { ECategory } from '@shared/types';

@Component({
  selector: 'app-category-selection',
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.scss']
})
export class CategorySelectionComponent implements OnInit {

  statisticCards = [
    { category: ECategory.STRESS, url: 'stress' },
    { category: ECategory.MOOD, url: 'mood' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
