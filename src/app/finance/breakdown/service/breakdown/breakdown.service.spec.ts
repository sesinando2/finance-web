import { TestBed, inject } from '@angular/core/testing';

import { BreakdownService } from './breakdown.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('BreakdownService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [BreakdownService]
    });
  });

  it('should be created', inject([BreakdownService], (service: BreakdownService) => {
    expect(service).toBeTruthy();
  }));
});
