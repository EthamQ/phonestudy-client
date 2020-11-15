import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericBarComponent } from './generic-bar.component';

describe('GenericBarComponent', () => {
  let component: GenericBarComponent;
  let fixture: ComponentFixture<GenericBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
