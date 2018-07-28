import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";

import {GoalService} from './goal.service';

describe('GoalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GoalService]
    });
  });

  it('should be created', inject([GoalService], (service: GoalService) => {
    expect(service).toBeTruthy();
  }));
});
