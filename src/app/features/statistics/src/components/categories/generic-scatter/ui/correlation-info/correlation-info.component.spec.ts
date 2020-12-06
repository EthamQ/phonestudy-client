import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrelationInfoComponent } from './correlation-info.component';

describe('CorrelationInfoComponent', () => {
  let component: CorrelationInfoComponent;
  let fixture: ComponentFixture<CorrelationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrelationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrelationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
