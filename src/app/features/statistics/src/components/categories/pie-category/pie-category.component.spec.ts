import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieCategoryComponent } from './pie-category.component';

describe('PieCategoryComponent', () => {
  let component: PieCategoryComponent;
  let fixture: ComponentFixture<PieCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
