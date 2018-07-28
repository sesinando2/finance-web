import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Account} from "../../../model/account.model";
import {ActivatedRoute, Data} from "@angular/router";
import {AccountService} from "../../service/account/account.service";
import {Subscription} from "rxjs/Subscription";
import {AccountBreadcrumbService} from "../../service/account-breadcrumb/account-breadcrumb.service";
import {RoutingService} from "../../../../service/routing/routing.service";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit, OnDestroy{

  accountList: Account[] = [];
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private routingService: RoutingService,
              private accountService: AccountService,
              private accountBreadcrumbService: AccountBreadcrumbService) { }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(this.updateData.bind(this));
    this.subscription.add(this.accountService.accountUpdated$.subscribe(this.reloadAccountList.bind(this)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRoute(accountId: number | string): string[] {
    let route = ['/account', accountId];
    let context: string[] = this.accountBreadcrumbService.getCurrentContext();

    if (context.length == 0) {
      context = ['breakdown', this.routingService.currentFrequency]
    }

    return <string[]>route.concat(context);
  }

  private updateData(data: Data) {
    if (data.hasOwnProperty('accountList')) {
      this.updateAccountList(data['accountList']);
    }
  }

  private reloadAccountList() {
    this.accountService.list().subscribe(this.updateAccountList.bind(this));
  }

  private updateAccountList(accountList: Account[]): void {
    this.accountList = accountList;
    this.cd.detectChanges();
  }
}
