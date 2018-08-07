import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Breakdown} from "../../model/breakdown.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  accountList: Account[];
  breakdownList: Breakdown[];
  totalBreakdown: Breakdown = new Breakdown();
  accountTrends: Breakdown[];

  private subscription: Subscription;

  constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute, private vcr: ViewContainerRef) { }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(this.updateData.bind(this));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private updateData(data: Data): void {
    this.accountList = data['accountList'];
    this.breakdownList = data['breakdownList'];
    this.totalBreakdown = data['totalBreakdown'];
    this.accountTrends = data['accountTrends'];
    this.cd.detectChanges();
  }
}
