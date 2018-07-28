import {inject, TestBed} from '@angular/core/testing';

import {TransactionAllocationModalService} from './transaction-allocation-modal.service';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

describe('TransactionAllocationModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule.forRoot()],
      providers: [TransactionAllocationModalService]
    });
  });

  it('should be created', inject([TransactionAllocationModalService], (service: TransactionAllocationModalService) => {
    expect(service).toBeTruthy();
  }));
});
