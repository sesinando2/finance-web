import {Injectable} from '@angular/core';
import {Budget} from "../../../model/budget.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";
import {Account} from "../../../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budgetUpdatedSource = new Subject<Budget>();
  private budgetListUpdatedSource = new Subject<Budget[]>();

  readonly budgetUpdated$ = this.budgetUpdatedSource.asObservable();
  readonly budgetListUpdated$ = this.budgetListUpdatedSource.asObservable();

  constructor(private http: HttpClient) { }

  getBudgetList(accountId: Number | String, frequency: String = 'MONTHLY'): Observable<Budget[]> {
    let frequencyUrl = frequency.toString().toLowerCase();
    return this.http.get(`${this.accountUrl}/${accountId}/${frequencyUrl}-budget`)
      .pipe(map((response: Object) => (<Object[]>response).map(this.createBudgetFrom)));
  }

  get(budgetId: Number): Observable<Budget> {
    return this.http.get(`${this.budgetUrl}/${budgetId}`)
      .pipe(map(this.createBudgetFrom));
  }

  createBudget(account: Account, budget: Budget): Observable<Budget> {
    return this.http.post(`${this.accountUrl}/${account.id}/budget`, budget)
      .pipe(map(this.createBudgetFrom),
            map((budget: Budget) => this.budgetUpdated(account, budget)));
  }

  update(account: Account, budget: Budget): Observable<Budget> {
    return this.http.put(`${this.budgetUrl}/${budget.id}`, budget)
      .pipe(map(this.createBudgetFrom),
            map((budget: Budget) => this.budgetUpdated(account, budget)));
  }

  delete(account: Account, budget: Budget): Observable<Object>  {
    return this.http.delete(`${this.budgetUrl}/${budget.id}`)
      .pipe(map(() => this.budgetUpdated(account, budget)));
  }

  exist(accountId: Number | String, budget: Budget): Observable<boolean> {
    return this.http.post(`${this.accountUrl}/${accountId}/budget/exist`, budget)
      .pipe(map((response: { exist: boolean }) => response.exist));
  }

  createBudgetFrom(object: Object): Budget {
    return Object.assign(new Budget(), object);
  }

  budgetUpdated(account: Account, budget: Budget): Budget {
    this.budgetUpdatedSource.next(budget);
    this.getBudgetList(account.id).subscribe(this.budgetListUpdated.bind(this));
    return budget;
  }

  budgetListUpdated(budgetList: Budget[]): Budget[] | any {
    this.budgetListUpdatedSource.next(budgetList);
    return budgetList;
  }

  private get accountUrl(): string {
    return `${environment.financeServer}/account`;
  }

  private get budgetUrl(): string {
    return `${environment.financeServer}/budget`;
  }
}
