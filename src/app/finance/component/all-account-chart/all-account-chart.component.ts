import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractChartComponent} from "../shared/abstract-chart.component";
import {Account} from "../../model/account.model";
import {Router} from "@angular/router";
import {RoutingService} from "../../../service/routing/routing.service";

@Component({
  selector: 'app-all-account-chart',
  templateUrl: './all-account-chart.component.html',
  styleUrls: ['./all-account-chart.component.scss']
})
export class AllAccountChartComponent extends AbstractChartComponent implements OnChanges {

  @Input() accountList: Account[];

  chartData: any[];

  constructor(protected cd: ChangeDetectorRef,
              protected router: Router,
              private routingService: RoutingService) {
   super(cd)
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.accountList) {
      this.translateToAccountChartData(<Account[]>changes.accountList.currentValue);
    }
  }

  selectAccount(selected): void {
    let account = this.accountList.find((account) => account.name == selected.name);
    if (account) {
      this.router.navigate(['/account', account.id, 'breakdown', this.routingService.currentFrequency])
    }
  }

  private translateToAccountChartData(accountList: Account[]): void {
    this.chartData = accountList.map(this.convertAccount.bind(this));
    this.cd.detectChanges();
  }

  private convertAccount(account: Account): {
    name: String,
    value: any
  } {
    return {
      name: account.name,
      value: account.balance
    };
  }
}
