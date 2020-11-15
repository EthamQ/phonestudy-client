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
    { category: ECategory.SLEEP, url: 'sleep' },
    { category: ECategory.APP, url: 'app' },
    { category: ECategory.COMMUNICATION, url: 'communication' },
    { category: ECategory.WORDS, url: 'words' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
