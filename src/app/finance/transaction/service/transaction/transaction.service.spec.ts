import {inject, TestBed} from '@angular/core/testing';

import {TransactionService} from './transaction.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AccountService} from "../../../account/service/account/account.service";
import {AllocationService} from "../allocation/allocation.service";

describe('TransactionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AccountService,
        AllocationService,

        TransactionService
      ]
    });
  });

  it('should be created', inject([TransactionService], (service: TransactionService) => {
    expect(service).toBeTruthy();
  }));
});
