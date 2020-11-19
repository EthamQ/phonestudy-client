import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericScatterComponent } from './generic-scatter.component';

describe('GenericScatterComponent', () => {
  let component: GenericScatterComponent;
  let fixture: ComponentFixture<GenericScatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericScatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
