import {Injectable} from '@angular/core';
import {Transaction} from '../../../model/transaction.model';
import {AllocationService} from '../allocation/allocation.service';
import {HttpClient} from '@angular/common/http';
import {Allocation} from '../../../model/allocation.model';
import {environment} from '../../../../../environments/environment';
import {Subject} from 'rxjs/Subject';
import {AccountService} from '../../../account/service/account/account.service';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Injectable()
export class TransactionService {

  private readonly transactionUpdatedSource: Subject<Transaction> = new Subject<Transaction>();
  readonly transactionUpdated$: Observable<Transaction> = this.transactionUpdatedSource.asObservable();

  constructor(private http: HttpClient,
              private accountService: AccountService,
              private allocationService: AllocationService) { }

  list(accountId: Number | String): Observable<Transaction[]> {
    return this.http.get(this.getAccountTransactionUrl(accountId))
      .pipe(map(this.createTransactionsFrom.bind(this)));
  }

  save(accountId: Number | String, transaction: Transaction): Observable<Transaction> {
    return this.http.post(this.getAccountTransactionUrl(accountId), transaction)
      .pipe(map(this.createTransactionFrom.bind(this)),
            map(this.transactionUpdated.bind(this)));
  }

  delete(transactionId: Number): Observable<Object> {
    return this.http.delete(`${this.transactionUrl}/${transactionId}`)
      .pipe(map(this.transactionUpdated.bind(this)));
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

  transactionUpdated(transaction: Transaction) {
    this.transactionUpdatedSource.next(transaction);
    this.accountService.accountUpdated(null);
    return transaction;
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
