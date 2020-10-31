import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationBarComponent } from './communication-bar.component';

describe('CommunicationBarComponent', () => {
  let component: CommunicationBarComponent;
  let fixture: ComponentFixture<CommunicationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
