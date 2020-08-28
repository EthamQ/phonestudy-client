import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicGraphComponent } from './music-graph.component';

describe('MusicGraphComponent', () => {
  let component: MusicGraphComponent;
  let fixture: ComponentFixture<MusicGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
