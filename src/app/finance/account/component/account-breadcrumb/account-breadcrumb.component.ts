import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {ISubscription} from "rxjs/Subscription";
import {AccountBreadcrumbService} from "../../service/account-breadcrumb/account-breadcrumb.service";
import {IBreadcrumb} from "../../../model/breadcrumb.model";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-account-breadcrumb',
  templateUrl: './account-breadcrumb.component.html',
  styleUrls: ['./account-breadcrumb.component.scss']
})
export class AccountBreadcrumbComponent implements OnInit, OnDestroy {

  breadcrumbs: IBreadcrumb[] = [];
  private subscription: ISubscription;

  constructor(private router: Router, private cd: ChangeDetectorRef, private accountBreadcrumbService: AccountBreadcrumbService) { }

  ngOnInit() {
    this.loadBreadcrumbs();
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(this.loadBreadcrumbs.bind(this));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadBreadcrumbs() {
    this.breadcrumbs = this.accountBreadcrumbService.getBreadcrumbs();
    this.cd.detectChanges();
  }
}
