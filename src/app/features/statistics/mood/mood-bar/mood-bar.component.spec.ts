import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodBarComponent } from './mood-bar.component';

describe('MoodBarComponent', () => {
  let component: MoodBarComponent;
  let fixture: ComponentFixture<MoodBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
