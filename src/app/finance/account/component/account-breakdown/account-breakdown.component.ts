import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Account} from "../../../model/account.model";
import {Breakdown} from "../../../model/breakdown.model";
import {BreakdownService} from "../../../breakdown/service/breakdown/breakdown.service";

@Component({
  selector: 'app-account-breakdown',
  templateUrl: './account-breakdown.component.html',
  styleUrls: ['./account-breakdown.component.scss']
})
export class AccountBreakdownComponent implements OnInit, OnDestroy {

  account: Account = new Account();
  currentBreakdown: Breakdown = null;
  totalBreakdown: Breakdown = null;
  breakdownList: Breakdown[] = [];
  currentFrequency: String = 'monthly';

  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private breakdownService: BreakdownService) { }

  ngOnInit() {
    this.subscription = this.subscribeToData();
    this.subscription.add(this.subscribeToParams());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  subscribeToData(): Subscription {
    return this.route.data.subscribe((data: Data) => {
      this.account = data['account'];
      this.breakdownList = data['breakdownList'];
      this.totalBreakdown = this.breakdownService.getTotalAccountBreakdown(this.account, this.breakdownList);
      this.cd.detectChanges();
    });
  }

  subscribeToParams(): Subscription {
    return this.route.params.subscribe((params: Params) => {
      this.currentFrequency = params['frequency'];
      this.cd.detectChanges();
    });
  }

  select(breakdown: Breakdown): void {
    this.currentBreakdown = breakdown;
  }
}
