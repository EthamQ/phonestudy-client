import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicMoodGraphComponent } from './music-mood-graph.component';

describe('MusicMoodGraphComponent', () => {
  let component: MusicMoodGraphComponent;
  let fixture: ComponentFixture<MusicMoodGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicMoodGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicMoodGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
