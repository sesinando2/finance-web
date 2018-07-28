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
    this.totalBreakdown = this.breakdownList  .reduce(this.calculateTotalBreakdown.bind(this), new Breakdown());
    this.cd.detectChanges();
  }

  private calculateTotalBreakdown(accumulator: Breakdown, breakdown: Breakdown): Breakdown {
    accumulator.balance += breakdown.balance;
    accumulator.totalCredit += breakdown.totalCredit;
    accumulator.totalDebit += breakdown.totalDebit;
    accumulator.allocatedAmount += breakdown.allocatedAmount;
    return accumulator;
  }
}
