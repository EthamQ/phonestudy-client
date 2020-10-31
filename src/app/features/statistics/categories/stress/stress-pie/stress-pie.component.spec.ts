import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StressPieComponent } from './stress-pie.component';

describe('StressPieComponent', () => {
  let component: StressPieComponent;
  let fixture: ComponentFixture<StressPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StressPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StressPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
