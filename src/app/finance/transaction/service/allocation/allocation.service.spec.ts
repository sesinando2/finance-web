import { TestBed, inject } from '@angular/core/testing';

import { AllocationService } from './allocation.service';

describe('AllocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllocationService]
    });
  });

  it('should be created', inject([AllocationService], (service: AllocationService) => {
    expect(service).toBeTruthy();
  }));
});
