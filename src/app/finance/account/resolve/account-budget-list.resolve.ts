import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Budget} from "../../model/budget.model";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {BudgetService} from "../../budget/service/budget/budget.service";
import {RoutingService} from "../../../service/routing/routing.service";

@Injectable()
export class AccountBudgetListResolve implements Resolve<Budget[]> {

  constructor(private budgetService: BudgetService, private routingService: RoutingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Budget[]> | Promise<Budget[]> | Budget[] {
    return this.budgetService.getBudgetList(this.routingService.getParam('id', route), route.paramMap.get('frequency'));
  }
}
