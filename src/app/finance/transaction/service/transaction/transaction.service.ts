import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Transaction} from '../../../model/transaction.model';
import {AllocationService} from '../allocation/allocation.service';
import {Allocation} from '../../../model/allocation.model';
import {environment} from '../../../../../environments/environment';
import {AccountService} from '../../../account/service/account/account.service';

import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {Account} from "../../../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly transactionUpdatedSource: Subject<Transaction> = new Subject<Transaction>();
  private readonly transactionListUpdatedSource: Subject<Transaction[]> = new Subject<Transaction[]>();

  readonly transactionUpdated$: Observable<Transaction> = this.transactionUpdatedSource.asObservable();
  readonly transactionListUpdated$: Observable<Transaction[]> = this.transactionListUpdatedSource.asObservable();

  constructor(private http: HttpClient,
              private accountService: AccountService,
              private allocationService: AllocationService) { }

  list(accountId: Number | String): Observable<Transaction[]> {
    return this.http.get(this.getAccountTransactionUrl(accountId))
      .pipe(map(this.createTransactionsFrom.bind(this)));
  }

  save(account: Account, transaction: Transaction): Observable<Transaction> {
    return this.http.post(this.getAccountTransactionUrl(account.id), transaction)
      .pipe(map(this.createTransactionFrom.bind(this)),
            map((transaction: Transaction) => this.transactionUpdated(account, transaction)));
  }

  delete(account: Account, transaction: Transaction): Observable<Transaction> {
    return this.http.delete(`${this.transactionUrl}/${transaction.id}`)
      .pipe(map((transaction: Transaction) => this.transactionUpdated(account, transaction)));
  }

  createTransactionsFrom(objectArray: Object[]): Transaction[] {
    return objectArray.map(this.createTransactionFrom.bind(this));
  }

  createTransactionFrom(object: Object): Transaction {
    const allocations: Allocation[] = this.allocationService.createAllocationsFrom((<Object[]>object['allocations']));
    const transaction = Object.assign(new Transaction(), object);
    transaction.allocations = allocations;
    return transaction;
  }

  transactionUpdated(account: Account, transaction: Transaction) {
    this.transactionUpdatedSource.next(transaction);
    this.accountService.accountUpdated(account);
    this.list(account.id).subscribe(this.transactionListUpdated.bind(this));
    return transaction;
  }

  transactionListUpdated(transactionList: Transaction[]) {
    this.transactionListUpdatedSource.next(transactionList);
    return transactionList;
  }

  private get accountUrl(): string {
    return `${environment.financeServer}/account`;
  }

  private get transactionUrl(): string {
    return `${environment.financeServer}/transaction`;
  }

  private getAccountTransactionUrl(accountId: Number | String) {
    return `${this.accountUrl}/${accountId}/transaction`;
  }
}
