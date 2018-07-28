import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {Account} from "../../model/account.model";
import {AccountService} from "../service/account/account.service";

@Injectable()
export class AccountResolve implements Resolve<Account> {

  constructor(private accountService: AccountService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Account> | Promise<Account> | Account {
    if (route.paramMap.has('id')) {
      return this.accountService.get(route.paramMap.get('id'));
    } else {
      return new Account();
    }
  }
}
