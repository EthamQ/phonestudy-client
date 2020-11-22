import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrelationHeaderComponent } from './correlation-header.component';

describe('CorrelationHeaderComponent', () => {
  let component: CorrelationHeaderComponent;
  let fixture: ComponentFixture<CorrelationHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrelationHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrelationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
