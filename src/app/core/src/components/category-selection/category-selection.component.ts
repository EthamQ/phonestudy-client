import { Component, OnInit } from '@angular/core';
import { ECategory } from '@shared/types';
import { ApplicationInfoService } from '@shared/services';
import { ActivatedRoute } from '@angular/router';

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
  ];

  statisticCardsCorrelation = [
    { 
      categories: [ECategory.APP, ECategory.STRESS, ECategory.MOOD, ECategory.SLEEP] ,
      url: 'app-correlation',
     },
     { 
      categories: [ECategory.COMMUNICATION, ECategory.STRESS, ECategory.MOOD, ECategory.SLEEP] ,
      url: 'communication-correlation',
     },
  ]

  subtitle = '';

  constructor(private applicationInfoService: ApplicationInfoService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    switch(this.applicationInfoService.getCompareWith(this.activatedRoute.pathFromRoot)) {
      case 'all': 
        this.subtitle = 'Deine Daten im Vergleich zu deren aller anderen Teilnehmer';
        break;
      case 'demographic': 
        this.subtitle = 'Deine Daten im Vergleich zu deren aller anderen Teilnehmer in deinem Alter (+-1)';
        break;
    }
  }

}
