import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Breakdown} from "../../../model/breakdown.model";
import {AbstractChartComponent} from "../../../component/shared/abstract-chart.component";

@Component({
  selector: 'app-breakdown-trends-chart',
  templateUrl: './breakdown-trends-chart.component.html',
  styleUrls: ['./breakdown-trends-chart.component.scss']
})
export class BreakdownTrendsChartComponent extends AbstractChartComponent implements OnChanges {

  @Input() breakdownList: Breakdown[] = [];

  chartData: {
    name: string,
    series: {
      name: string,
      value: any
    }[]
  }[] = [];

  constructor(protected cd: ChangeDetectorRef) { super(cd) }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.breakdownList) {
      this.chartData = this.deriveChartDataFrom(changes.breakdownList.currentValue);
      this.cd.detectChanges();
    }
  }

  private deriveChartDataFrom(breakdownList: Breakdown[]): {
    name: string,
    series: {
      name: string,
      value: any
    }[]
  }[] {
    let balance = [];
    let expense = [];
    let income = [];
    let expenseRate = [];
    let incomeRate = [];


    breakdownList.forEach((breakdown: Breakdown) => {
      balance.push({
        name: new Date(parseInt(<string>breakdown.label)),
        value: breakdown.balance
      });

      expense.push({
        name: new Date(parseInt(<string>breakdown.label)),
        value: breakdown.totalDebit
      });

      income.push({
        name: new Date(parseInt(<string>breakdown.label)),
        value: breakdown.totalCredit
      });

      expenseRate.push({
        name: new Date(parseInt(<string>breakdown.label)),
        value: breakdown.expenseRate
      });

      incomeRate.push({
        name: new Date(parseInt(<string>breakdown.label)),
        value: breakdown.incomeRate
      })
    });

    return [{
      name: 'Balance',
      series: balance
    }, {
      name: 'Expense',
      series: expense
    }, {
      name: 'Income',
      series: income
    }, {
      name: 'Expense Rate',
      series: expenseRate
    }, {
      name: 'Income Rate',
      series: incomeRate
    }];
  }
}
