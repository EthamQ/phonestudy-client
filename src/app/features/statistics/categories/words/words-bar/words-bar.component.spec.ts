import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsBarComponent } from './words-bar.component';

describe('WordsBarComponent', () => {
  let component: WordsBarComponent;
  let fixture: ComponentFixture<WordsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
