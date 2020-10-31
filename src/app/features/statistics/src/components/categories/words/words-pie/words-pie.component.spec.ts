import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsPieComponent } from './words-pie.component';

describe('WordsPieComponent', () => {
  let component: WordsPieComponent;
  let fixture: ComponentFixture<WordsPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
