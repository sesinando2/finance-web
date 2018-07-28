import {inject, TestBed} from '@angular/core/testing';

import {BudgetModalService} from './budget-modal.service';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

describe('BudgetModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot()
      ],

      providers: [
        BudgetModalService
      ]
    });
  });

  it('should be created', inject([BudgetModalService], (service: BudgetModalService) => {
    expect(service).toBeTruthy();
  }));
});
