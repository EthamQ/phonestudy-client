import { TestBed } from '@angular/core/testing';

import { CorrelationCalculationService } from './correlation-calculation.service';

describe('CorrelationCalculationService', () => {
  let service: CorrelationCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrelationCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
