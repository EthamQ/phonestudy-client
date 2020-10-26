import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUsagePieComponent } from './app-usage-pie.component';

describe('AppUsagePieComponent', () => {
  let component: AppUsagePieComponent;
  let fixture: ComponentFixture<AppUsagePieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUsagePieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUsagePieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
