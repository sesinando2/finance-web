import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Goal} from "../../model/goal.model";
import {Injectable} from "@angular/core";
import {GoalService} from "../../budget/service/goal/goal.service";
import {Observable} from "rxjs/Rx";
import {RoutingService} from "../../../service/routing/routing.service";

@Injectable({ providedIn: 'root' })
export class AccountGoalListResolve implements Resolve<Goal[]> {

  constructor(private goalService: GoalService, private routingService: RoutingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Goal[] | Observable<Goal[]> | Promise<Goal[]> {
    let id = this.routingService.getParam('id', route);
    return this.goalService.getGoalList(id, this.routingService.currentFrequency);
  }
}
