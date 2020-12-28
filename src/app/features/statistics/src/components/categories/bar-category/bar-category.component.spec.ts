import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCategoryComponent } from './bar-category.component';

describe('BarCategoryComponent', () => {
  let component: BarCategoryComponent;
  let fixture: ComponentFixture<BarCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
