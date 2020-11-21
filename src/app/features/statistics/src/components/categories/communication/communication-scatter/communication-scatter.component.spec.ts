import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationScatterComponent } from './communication-scatter.component';

describe('CommunicationScatterComponent', () => {
  let component: CommunicationScatterComponent;
  let fixture: ComponentFixture<CommunicationScatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationScatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
