import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {Transaction} from "../../../model/transaction.model";
import {Account} from "../../../model/account.model";
import {Subscription} from "rxjs/Subscription";
import {TransactionService} from "../../../transaction/service/transaction/transaction.service";
import {AccountService} from "../../service/account/account.service";

@Component({
  selector: 'app-account-transaction-details',
  templateUrl: './account-transaction-details.component.html',
  styleUrls: ['./account-transaction-details.component.scss']
})
export class AccountTransactionDetailsComponent implements OnInit, OnDestroy {

  account: Account;
  transactionList: Transaction[] = [];

  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private accountService: AccountService,
              private transactionService: TransactionService) { }

  ngOnInit() {
    this.subscription = this.route.parent.data.subscribe(this.updateAccount.bind(this));
    this.subscription.add(this.route.data.subscribe(this.updateTransactionList.bind(this)));
    this.subscription.add(this.accountService.accountUpdated$.subscribe(this.refreshAccount.bind(this)));
    this.subscription.add(this.transactionService.transactionUpdated$.subscribe(this.refreshTransactionList.bind(this)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private updateAccount(data: Data) {
    this.account = data['account'];
    this.cd.detectChanges();
  }

  private updateTransactionList(data: Data) {
    this.transactionList = data['transactionList'];
    this.cd.detectChanges();
  }

  private refreshAccount() {
    this.accountService.get(this.account.id).subscribe((account) => {
      this.account = account;
      this.cd.detectChanges();
    });
  }

  private refreshTransactionList() {
    this.transactionService.list(this.account.id).subscribe((transactionList) => {
      this.transactionList = transactionList;
      this.cd.detectChanges();
    });
  }
}
