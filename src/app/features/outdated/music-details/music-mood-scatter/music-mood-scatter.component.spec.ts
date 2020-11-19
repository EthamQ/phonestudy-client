import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicMoodScatterComponent } from './music-mood-scatter.component';

describe('MusicMoodScatterComponent', () => {
  let component: MusicMoodScatterComponent;
  let fixture: ComponentFixture<MusicMoodScatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicMoodScatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicMoodScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
