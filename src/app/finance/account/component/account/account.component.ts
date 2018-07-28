import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {AccountBreadcrumbService} from "../../service/account-breadcrumb/account-breadcrumb.service";
import {RoutingService} from "../../../../service/routing/routing.service";
import {AccountBudgetComponent} from "../account-budget/account-budget.component";
import {AccountTransactionDetailsComponent} from "../account-transaction-details/account-transaction-details.component";
import {AccountTransactionNewComponent} from "../account-transaction-new/account-transaction-new.component";
import {Account} from "../../../model/account.model";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  title: String = 'Accounts';
  private currentComponent: any = null;
  private subscription: Subscription;

  constructor(private cd: ChangeDetectorRef,
              private router: Router,
              private routingService: RoutingService,
              private breadcrumbService: AccountBreadcrumbService) { }

  ngOnInit() {
    this.updateTitle();

    this.subscription = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => this.updateTitle());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateTitle() {
    let currentContext = this.breadcrumbService.getCurrentContext();
    let account = <Account>this.routingService.getData('account');

    if (!currentContext || !account) {
      return;
    }

    if (currentContext.length == 0) {
      this.title = account.id ? account.name : 'New Account';
      this.cd.detectChanges();
      return;
    }

    this.title = this.getTitleFrom(currentContext[0], account);
    this.cd.detectChanges();
  }

  getTitleFrom(context: String, account: Account) {

    switch (context) {
      case 'details':
        return `Details for ${account.name}`;

      case 'budget':
        return `Budget for ${account.name}`;

      case 'transaction':
        return `Transactions for ${account.name}`;

      case 'breakdown':
        return `Breakdown for ${account.name}`;

      default:
        return account.name;
    }
  }

  onActivate(outletComponentRef) {
    this.currentComponent = outletComponentRef;
  }

  clickNew() {
    if (this.currentComponent instanceof AccountBudgetComponent) {
      (<AccountBudgetComponent>this.currentComponent).newBudget();
    } else if (this.currentComponent instanceof AccountTransactionDetailsComponent
                || this.currentComponent instanceof AccountTransactionNewComponent) {
      return this.navigateToNewTransaction();
    } else {
      return this.router.navigate(['/account', 'new']);
    }
  }

  private navigateToNewTransaction(): any {
    let account: Account = this.routingService.getData('account');
    let frequency = this.routingService.currentFrequency;
    let commands = ['/account', account.id, 'transaction', 'new'];
    if (frequency) {
      commands.push(frequency);
    }
    return this.router.navigate(commands);
  }
}
