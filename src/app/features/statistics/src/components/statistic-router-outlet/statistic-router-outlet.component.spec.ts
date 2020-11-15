import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticRouterOutletComponent } from './statistic-router-outlet.component';

describe('StatisticRouterOutletComponent', () => {
  let component: StatisticRouterOutletComponent;
  let fixture: ComponentFixture<StatisticRouterOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticRouterOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
