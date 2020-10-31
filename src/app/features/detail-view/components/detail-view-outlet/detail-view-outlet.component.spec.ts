import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewOutletComponent } from './detail-view-outlet.component';

describe('DetailViewOutletComponent', () => {
  let component: DetailViewOutletComponent;
  let fixture: ComponentFixture<DetailViewOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailViewOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailViewOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
