import {Injectable} from '@angular/core';
import {Budget} from "../../../model/budget.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";

@Injectable()
export class BudgetService {

  private budgetUpdatedSource = new Subject<Budget>();
  readonly budgetUpdated$ = this.budgetUpdatedSource.asObservable();

  constructor(private http: HttpClient) { }

  getBudgetList(accountId: Number | String, frequency: String = 'MONTHLY'): Observable<Budget[]> {
    let frequencyUrl = frequency.toString().toLowerCase();
    return this.http.get(`${this.accountUrl}/${accountId}/${frequencyUrl}-budget`)
      .pipe(map((response: Object) => (<Object[]>response).map(this.createBudgetFrom)));
  }

  createBudget(accountId: Number | String, budget: Budget): Observable<Budget> {
    return this.http.post(`${this.accountUrl}/${accountId}/budget`, budget)
      .pipe(map(this.createBudgetFrom.bind(this)),
            map(this.budgetUpdated.bind(this)));
  }

  get(budgetId: Number): Observable<Budget> {
    return this.http.get(`${this.budgetUrl}/${budgetId}`)
      .pipe(map(this.createBudgetFrom));
  }

  update(budget: Budget): Observable<Budget> {
    return this.http.put(`${this.budgetUrl}/${budget.id}`, budget)
      .pipe(map(this.createBudgetFrom),
            map(this.budgetUpdated.bind(this)));
  }

  delete(budgetId: number | string | Number | String): Observable<Object>  {
    return this.http.delete(`${this.budgetUrl}/${budgetId}`)
      .pipe(map(this.budgetUpdated.bind(this)));
  }

  exist(accountId: Number | String, budget: Budget): Observable<boolean> {
    return this.http.post(`${this.accountUrl}/${accountId}/budget/exist`, budget)
      .pipe(map((response: { exist: boolean }) => response.exist));
  }

  createBudgetFrom(object: Object): Budget {
    return Object.assign(new Budget(), object);
  }

  budgetUpdated(budget: Budget): Budget | any {
    this.budgetUpdatedSource.next(budget);
    return budget;
  }

  private get accountUrl(): string {
    return `${environment.financeServer}/account`;
  }

  private get budgetUrl(): string {
    return `${environment.financeServer}/budget`;
  }
}
