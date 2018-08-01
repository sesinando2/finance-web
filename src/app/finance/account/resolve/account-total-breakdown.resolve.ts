import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Breakdown} from "../../model/breakdown.model";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {BreakdownService} from "../../breakdown/service/breakdown/breakdown.service";

@Injectable()
export class AccountTotalBreakdownResolve implements Resolve<Breakdown> {

  constructor(private breakdownService: BreakdownService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Breakdown | Observable<Breakdown> | Promise<Breakdown> {
    let accountId = route.paramMap.get('id');
    let frequency = route.paramMap.get('frequency');
    return this.breakdownService.getTotalAccountBreakdown(accountId, frequency);
  }
}
