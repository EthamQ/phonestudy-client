import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUsageBarComponent } from './app-usage-bar.component';

describe('AppUsageBarComponent', () => {
  let component: AppUsageBarComponent;
  let fixture: ComponentFixture<AppUsageBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUsageBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUsageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
