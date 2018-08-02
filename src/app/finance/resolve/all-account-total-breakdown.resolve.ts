import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Breakdown} from "../model/breakdown.model";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {BreakdownService} from "../breakdown/service/breakdown/breakdown.service";

@Injectable()
export class AllAccountTotalBreakdownResolve implements Resolve<Breakdown> {

  constructor(private breakdownService: BreakdownService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Breakdown> | Promise<Breakdown> | Breakdown {
    let frequency = route.params['frequency'];
    return this.breakdownService.getAllAccountTotalBreakdown(frequency);
  }

}
