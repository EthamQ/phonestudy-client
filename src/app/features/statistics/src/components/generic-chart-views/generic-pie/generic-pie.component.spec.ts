import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericPieComponent } from './generic-pie.component';

describe('GenericPieComponent', () => {
  let component: GenericPieComponent;
  let fixture: ComponentFixture<GenericPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
