import {environment} from '../../../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Account} from '../../../model/account.model';
import {Subject} from 'rxjs/Subject';
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";

@Injectable()
export class AccountService {

  private readonly accountUpdatedSource = new Subject<Account>();
  readonly accountUpdated$ = this.accountUpdatedSource.asObservable();

  constructor(private http: HttpClient) { }

  list(): Observable<Account[]> {
    return this.http.get(this.accountUrl)
      .pipe(map((response: Object) => {
        return (<Object[]>response).map(this.createAccountFrom);
      }));
  }

  get(accountId: number | string | Number | String): Observable<Account> {
    return this.http.get(`${this.accountUrl}/${accountId}`)
      .pipe(map(this.createAccountFrom));
  }

  post(account: Account | {id?: Number, name?: String, description?: String}): Observable<Account> {
    return this.http.post(this.accountUrl, account)
      .pipe(map(this.createAccountFrom),
            map(this.accountUpdated.bind(this)));
  }

  put(id: Number, account: Account | {id?: Number, name?: String, description?: String}): Observable<Account> {
    return this.http.put(`${this.accountUrl}/${id}`, account)
      .pipe(map(this.createAccountFrom),
            map(this.accountUpdated.bind(this)));
  }

  delete(id: Number): Observable<Object> {
    return this.http.delete(`${this.accountUrl}/${id}`)
      .pipe(map(this.accountUpdated.bind(this)));
  }

  exist(account: Account): Observable<boolean> {
    return this.http.post(`${this.accountUrl}/exist`, account)
      .pipe(map((response: { exist: boolean }) => response.exist));
  }

  accountUpdated(account: Account): Account | any {
    this.accountUpdatedSource.next(account);
    return account;
  }

  private createAccountFrom(json: Object): Account {
    return Object.assign(new Account(), json);
  }

  private get accountUrl(): string {
    return `${environment.financeServer}/account`;
  }
}
