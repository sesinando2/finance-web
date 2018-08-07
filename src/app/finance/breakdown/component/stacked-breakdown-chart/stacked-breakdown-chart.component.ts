import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractChartComponent} from "../../../component/shared/abstract-chart.component";
import {Breakdown} from "../../../model/breakdown.model";

@Component({
  selector: 'app-stacked-breakdown-chart',
  templateUrl: './stacked-breakdown-chart.component.html',
  styleUrls: ['./stacked-breakdown-chart.component.scss']
})
export class StackedBreakdownChartComponent extends AbstractChartComponent implements OnChanges {

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
      this.chartData = this.deriveChartData(changes.breakdownList.currentValue);
    }
  }

  private deriveChartData(breakdownList: Breakdown[]): {
    name: string,
    series: {
      name: string,
      value: any
    }[]
  }[] {
    let balance = [];
    let expense = [];
    let income = [];
    let allocated = [];
    let expenseRate = [];
    let incomeRate = [];

    breakdownList.forEach((breakdown: Breakdown) => {
      balance.push({
        name: breakdown.label,
        value: breakdown.balance
      });

      expense.push({
        name: breakdown.label,
        value: breakdown.totalDebit
      });

      income.push({
        name: breakdown.label,
        value: breakdown.totalCredit
      });

      allocated.push({
        name: breakdown.label,
        value: breakdown.allocatedAmount
      });

      expenseRate.push({
        name: breakdown.label,
        value: breakdown.expenseRate
      });

      incomeRate.push({
        name: breakdown.label,
        value: breakdown.incomeRate
      });
    });

    return [{
      name: 'Balance',
      series: balance,
    }, {
      name: 'Expense',
      series: expense,
    }, {
      name: 'Income',
      series: income,
    }, {
      name: 'Allocated',
      series: allocated,
    }, {
      name: 'Expense Rate',
      series: expenseRate,
    }, {
      name: 'Income Rate',
      series: incomeRate,
    }]
  }
}
