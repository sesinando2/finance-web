import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Breakdown} from "../model/breakdown.model";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {BreakdownService} from "../breakdown/service/breakdown/breakdown.service";

@Injectable()
export class AllAccountBreakdownResolve implements Resolve<Breakdown[]> {

  constructor(private breakdownService: BreakdownService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Breakdown[]> | Promise<Breakdown[]> | Breakdown[] {
    let frequency = this.getFrequencyFrom(route);
    return this.breakdownService.getAllAccountBreakdown(frequency);
  }

  private getFrequencyFrom(route: ActivatedRouteSnapshot): string {
    let frequency = route.params['frequency'];

    if (!frequency) {
      frequency = 'monthly';
    }

    return frequency;
  }
}
