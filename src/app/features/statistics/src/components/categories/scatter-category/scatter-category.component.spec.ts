import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterCategoryComponent } from './scatter-category.component';

describe('ScatterCategoryComponent', () => {
  let component: ScatterCategoryComponent;
  let fixture: ComponentFixture<ScatterCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScatterCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
