///<reference path="../../../../../../node_modules/rxjs/internal/operators/combineAll.d.ts"/>
import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Breakdown} from "../../../model/breakdown.model";
import {HttpClient} from "@angular/common/http";
import {combineAll, map, toArray} from "rxjs/operators";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BreakdownService {

  constructor(private http: HttpClient) { }

  getAccountBreakdown(accountId: any, frequency: any = 'monthly'): Observable<Breakdown[]> {
    return <Observable<Breakdown[]>>this.http.get(this.getAccountBreakdownUrl(accountId, frequency))
      .pipe(combineAll(), map((response) => this.createBreakdownFrom(response[0])), toArray())
  }

  getTotalAccountBreakdown(accountId: any, frequency: any = 'monthly'): Observable<Breakdown> {
    return this.http.get(this.getAccountTotalBreakdownUrl(accountId, frequency))
      .pipe(map(this.createBreakdownFrom.bind(this)));
  }

  getAllAccountBreakdown(frequency: any = 'monthly'): Observable<Breakdown[]> {
    return <Observable<Breakdown[]>>this.http.get(this.getAllAccountBreakdownUrl(frequency))
      .pipe(combineAll(), map((response) => this.createBreakdownFrom(response[0])), toArray())
  }

  getAllAccountTotalBreakdown(frequency: any = 'monthly'): Observable<Breakdown> {
    return this.http.get(this.getAllAccountTotalBreakdownUrl(frequency))
      .pipe(map(this.createBreakdownFrom.bind(this)));
  }

  getAllAccountTrends(frequency: any = 'monthly'): Observable<Breakdown[]> {
    return this.http.get(this.getAllAccountTrendsUrl(frequency))
      .pipe(combineAll(), map((response) => this.createBreakdownFrom(response[0])), toArray())
  }

  private createBreakdownFrom(object: Object): Breakdown {
    return Object.assign(new Breakdown(), object);
  }

  private getAccountTotalBreakdownUrl(accountId: any, frequency: any): string {
    return `${this.accountUrl}/${accountId}/total-${frequency}-breakdown`;
  }

  private getAccountBreakdownUrl(accountId: any, frequency: any): string {
    return `${this.accountUrl}/${accountId}/${frequency}-breakdown`;
  }

  private getAllAccountBreakdownUrl(frequency: any): string {
    return `${environment.financeServer}/${frequency}-breakdown`;
  }

  private getAllAccountTotalBreakdownUrl(frequency: any): string {
    return `${environment.financeServer}/total-${frequency}-breakdown`;
  }

  private getAllAccountTrendsUrl(frequency: any) {
    return `${environment.financeServer}/${frequency}-trends`;
  }

  private get accountUrl(): string {
    return `${environment.financeServer}/account`;
  }
}
