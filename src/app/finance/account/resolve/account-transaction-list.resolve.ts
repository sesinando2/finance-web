import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Transaction} from "../../model/transaction.model";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {TransactionService} from "../../transaction/service/transaction/transaction.service";

@Injectable()
export class AccountTransactionListResolve implements Resolve<Transaction[]> {

  constructor(private transactionService: TransactionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Transaction[]> | Promise<Transaction[]> | Transaction[] {
    return this.transactionService.list(route.params['id']);
  }
}
