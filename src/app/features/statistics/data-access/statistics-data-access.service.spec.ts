import { TestBed } from '@angular/core/testing';

import { StatisticsDataAccessService } from './statistics-data-access.service';

describe('StatisticsDataAccessService', () => {
  let service: StatisticsDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
