import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationPieComponent } from './communication-pie.component';

describe('CommunicationPieComponent', () => {
  let component: CommunicationPieComponent;
  let fixture: ComponentFixture<CommunicationPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
