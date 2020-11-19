import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMoodLineComponent } from './app-mood-line.component';

describe('AppMoodLineComponent', () => {
  let component: AppMoodLineComponent;
  let fixture: ComponentFixture<AppMoodLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppMoodLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMoodLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
