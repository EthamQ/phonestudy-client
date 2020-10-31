import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StressBarComponent } from './stress-bar.component';

describe('StressBarComponent', () => {
  let component: StressBarComponent;
  let fixture: ComponentFixture<StressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
