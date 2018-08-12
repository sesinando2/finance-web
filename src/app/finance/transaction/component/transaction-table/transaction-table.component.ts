import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Transaction} from '../../../model/transaction.model';
import {TransactionService} from '../../service/transaction/transaction.service';
import {TransactionAllocationModalService} from "../../service/transaction-allocation-modal/transaction-allocation-modal.service";
import {Account} from "../../../model/account.model";
import {AccountService} from "../../../account/service/account/account.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnChanges, OnDestroy {

  @Input() account: Account = new Account();
  @Input() transactionList: Transaction[] = [];

  private subscription: Subscription;

  constructor(private cd: ChangeDetectorRef,
              private accountService: AccountService,
              private transactionService: TransactionService,
              private allocationModalService: TransactionAllocationModalService) {

    this.subscription = new Subscription();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    let subscription = this.accountService.get(this.account.id)
      .subscribe((account) => {
        this.account = account;
        this.cd.detectChanges();
      });

    this.subscription.add(subscription)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getBalance(index: number): any {
    let balance = this.account.balance;

    for (let i = 0; i < index; i++) {
      balance = (<number>balance - <number>this.transactionList[i].total);
    }

    return balance;
  }

  delete(transaction: Transaction): void {
    this.transactionService.delete(this.account, transaction).subscribe();
  }

  select(transaction: Transaction): void {
    this.allocationModalService.details(transaction);
  }
}
