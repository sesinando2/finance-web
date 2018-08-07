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
  @Input() propertiesLabel: { [key: string]: string } = {
    balance: 'Balance',
    totalDebit: 'Expense',
    totalCredit: 'Income',
    allocatedAmount: 'Allocated',
    expenseRate: 'Expense Rate',
    incomeRate: 'Income Rate'
  };

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
    let series = this.createSeriesFrom(this.propertiesLabel, breakdownList);
    let data = [];

    for (let property in series) {
      data.push({
        name: this.propertiesLabel[property],
        series: series[property]
      });
    }

    return data;
  }

  private createSeriesFrom(propertiesLabel: { [key: string]: string }, breakdownList: Breakdown[]): {
    [key: string]: {
      name: string,
      value: any
    }[]
  } {
    let series: {
      [key: string]: {
        name: string,
        value: any
      }[]
    } = {};

    for (let property in propertiesLabel) {
      series[property] = [];
    }

    breakdownList.forEach((breakdown: Breakdown) => {
      for (let property in this.propertiesLabel) {
        series[property].push({
          name: <string>breakdown.label,
          value: breakdown[property]
        });
      }
    });

    return series
  }
}
