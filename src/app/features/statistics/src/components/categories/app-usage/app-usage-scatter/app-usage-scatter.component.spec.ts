import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUsageScatterComponent } from './app-usage-scatter.component';

describe('AppUsageScatterComponent', () => {
  let component: AppUsageScatterComponent;
  let fixture: ComponentFixture<AppUsageScatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUsageScatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUsageScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
