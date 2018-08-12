import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Goal} from "../../../model/goal.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

import {Subject} from "rxjs/Subject";
import {map, concatMap} from "rxjs/operators";
import {Account} from "../../../model/account.model";
import {BudgetService} from "../budget/budget.service";

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private goalUpdatedSource = new Subject<Goal>();
  private goalListUpdatedSource = new Subject<Goal[]>();

  readonly goalUpdated$ = this.goalUpdatedSource.asObservable();
  readonly goalListUpdated$ = this.goalListUpdatedSource.asObservable();

  constructor(private http: HttpClient, private budgetService: BudgetService) { }

  get(goalId: Number | String): Observable<Goal> {
    return this.http.get(`${this.goalUrl}/${goalId}`)
      .pipe(map(this.createGoalFrom.bind(this)), concatMap(this.calculate.bind(this)));
  }

  getGoalList(accountId: Number | String, frequency: String = 'MONTHLY'): Observable<Goal[]> {
    let frequencyUrl = frequency.toString().toLowerCase();
    return this.http.get(`${this.accountUrl}/${accountId}/${frequencyUrl}-goal`)
      .pipe(map((response: Object) => (<Object[]>response).map(this.createGoalFrom.bind(this))));
  }

  createGoal(account: Account, goal: Goal): Observable<Goal> {
    return this.calculate(goal)
      .pipe(concatMap((goal) => this.http.post(`${this.accountUrl}/${account.id}/goal`, goal)),
        map(this.createGoalFrom.bind(this)),
        map((goal: Goal) => this.goalUpdated(account, goal)));
  }

  update(account: Account, goal: Goal) {
    return this.calculate(goal)
      .pipe(concatMap((goal) => this.http.put(`${this.goalUrl}/${goal.id}`, goal)),
        map(this.createGoalFrom.bind(this)),
        map((goal: Goal) => this.goalUpdated(account, goal)));
  }

  delete(account: Account, goal: Goal): Observable<Object> {
    return this.http.delete(`${this.goalUrl}/${goal.id}`)
      .pipe(map(() => this.goalUpdated(account, goal)));
  }

  exist(accountId: Number | String, goal: Goal): Observable<boolean> {
    return this.http.post(`${this.accountUrl}/${accountId}/goal/exist`, goal)
      .pipe(map((response: { exist: boolean }) => response.exist));
  }

  calculate(goal: Goal): Observable<Goal> {
    return this.http.post(`${this.goalUrl}/calculate`, goal).pipe(map(this.createGoalFrom.bind(this)));
  }

  createGoalFrom(object: Object): Goal {
    return Object.assign(new Goal(), object);
  }

  goalUpdated(account: Account, goal: Goal): Goal | any {
    this.goalUpdatedSource.next(goal);
    this.budgetService.budgetUpdated(account, goal);
    this.getGoalList(account.id).subscribe(this.goalListUpdated.bind(this));
    return goal;
  }

  goalListUpdated(goalList: Goal[]): Goal[] {
    this.goalListUpdatedSource.next(goalList);
    return goalList;
  }

  private get accountUrl(): string {
    return `${environment.financeServer}/account`;
  }

  private get goalUrl(): string {
    return `${environment.financeServer}/goal`;
  }
}
