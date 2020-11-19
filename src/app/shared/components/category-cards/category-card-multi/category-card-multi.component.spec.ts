import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCardMultiComponent } from './category-card-multi.component';

describe('CategoryCardMultiComponent', () => {
  let component: CategoryCardMultiComponent;
  let fixture: ComponentFixture<CategoryCardMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCardMultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCardMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
