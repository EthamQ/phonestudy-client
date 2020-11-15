import { TestBed } from '@angular/core/testing';

import { StatisticsMappingService } from './statistics-mapping.service';

describe('StatisticsMappingService', () => {
  let service: StatisticsMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
