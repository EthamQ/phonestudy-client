import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMoodScatterComponent } from './app-mood-scatter.component';

describe('AppMoodScatterComponent', () => {
  let component: AppMoodScatterComponent;
  let fixture: ComponentFixture<AppMoodScatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppMoodScatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMoodScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
