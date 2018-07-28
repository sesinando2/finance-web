import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Goal} from "../../../model/goal.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

import {Subject} from "rxjs/Subject";
import {map, concatMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private goalUpdatedSource = new Subject<Goal>();
  readonly goalUpdated$ = this.goalUpdatedSource.asObservable();

  constructor(private http: HttpClient) { }

  get(goalId: Number | String): Observable<Goal> {
    return this.http.get(`${this.goalUrl}/${goalId}`)
      .pipe(map(this.createGoalFrom.bind(this)), concatMap(this.calculate.bind(this)));
  }

  getGoalList(accountId: Number | String, frequency: String = 'MONTHLY'): Observable<Goal[]> {
    let frequencyUrl = frequency.toString().toLowerCase();
    return this.http.get(`${this.accountUrl}/${accountId}/${frequencyUrl}-goal`)
      .pipe(map((response: Object) => (<Object[]>response).map(this.createGoalFrom.bind(this))));
  }

  createGoal(accountId: Number | String, goal: Goal): Observable<Goal> {
    return this.calculate(goal)
      .pipe(concatMap((goal) => this.http.post(`${this.accountUrl}/${accountId}/goal`, goal)),
        map(this.createGoalFrom.bind(this)), map(this.goalUpdated.bind(this)));
  }

  update(goal: Goal) {
    return this.calculate(goal)
      .pipe(concatMap((goal) => this.http.put(`${this.goalUrl}/${goal.id}`, goal)),
        map(this.createGoalFrom.bind(this)), map(this.goalUpdated.bind(this)));
  }

  delete(goalId: number | string | Number | String): Observable<Object> {
    return this.http.delete(`${this.goalUrl}/${goalId}`)
      .pipe(map(this.goalUpdated.bind(this)));
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

  goalUpdated(goal: Goal): Goal | any {
    this.goalUpdatedSource.next(goal);
    return goal;
  }

  private get accountUrl(): string {
    return `${environment.financeServer}/account`;
  }

  private get goalUrl(): string {
    return `${environment.financeServer}/goal`;
  }
}
