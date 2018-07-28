import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Breakdown} from "../../model/breakdown.model";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {BreakdownService} from "../../breakdown/service/breakdown/breakdown.service";

@Injectable()
export class AccountBreakdownResolve implements Resolve<Breakdown[]> {

  constructor(private breakdownService: BreakdownService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Breakdown[]> | Promise<Breakdown[]> | Breakdown[] {

    if (route.paramMap.has('id') && route.paramMap.has('frequency')) {
      let accountId = route.paramMap.get('id');
      let frequency = route.paramMap.get('frequency');
      return this.breakdownService.getAccountBreakdown(accountId, frequency);
    }

    return [];
  }

}
