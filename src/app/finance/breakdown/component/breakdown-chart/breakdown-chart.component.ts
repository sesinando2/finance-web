import {ChangeDetectorRef, Component, Input, OnChanges} from '@angular/core';
import {Breakdown} from "../../../model/breakdown.model";
import {AbstractChartComponent} from "../../../component/shared/abstract-chart.component";

@Component({
  selector: 'app-breakdown-chart',
  templateUrl: './breakdown-chart.component.html',
  styleUrls: ['./breakdown-chart.component.scss']
})
export class BreakdownChartComponent extends AbstractChartComponent implements OnChanges {

  @Input() breakdown: Breakdown;
  @Input() propertiesLabel: {} = {
    balance: 'Balance',
    totalDebit: 'Expense',
    totalCredit: 'Income',
    allocatedAmount: 'Allocated',
    expenseRate: 'Expense Rate',
    incomeRate: 'Income Rate'
  };

  data: any[] = [];

  constructor(protected cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnChanges() {
    this.updateData();
  }

  updateData(): void {
    this.data = [];

    if (this.breakdown) {
      for (let property in this.propertiesLabel) {
        this.addToData(property, this.propertiesLabel[property]);
      }
    }
  }

  private addToData(property: string, label: string) {
    this.data.push({
      name: label,
      value: this.breakdown[property]
    })
  }
}
