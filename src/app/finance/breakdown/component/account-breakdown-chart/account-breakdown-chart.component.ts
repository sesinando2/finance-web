import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Breakdown} from "../../../model/breakdown.model";
import {AbstractChartComponent} from "../../../component/shared/abstract-chart.component";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbAccordion} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-account-breakdown-chart',
  templateUrl: './account-breakdown-chart.component.html',
  styleUrls: ['./account-breakdown-chart.component.scss']
})
export class AccountBreakdownChartComponent extends AbstractChartComponent implements OnInit, OnChanges {

  @Input() breakdownList: Breakdown[] = [];
  @Input() label: string = 'Total';
  @Input() property: string = 'balance';
  @Input() showAll: boolean = false;

  @ViewChild('acc') acc: NgbAccordion;

  basicChartData: {
    name: String,
    value: any
  }[] = [];

  private fragment: String;

  constructor(protected cd: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) {
    super(cd);
  }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.breakdownList) {
      this.deriveChartData(changes.breakdownList.currentValue);
    }
  }

  navigateToAccount(selected) {
    let breakdown: Breakdown = this.breakdownList.find((breakdown => {
      return breakdown.label == selected.name && breakdown.balance == selected.value;
    }));
    this.router.navigate(['/account', breakdown.account.id, 'breakdown'])
  }

  private deriveChartData(breakdownList: Breakdown[]): void {
    this.basicChartData = breakdownList
      .filter((breakdown: Breakdown) => this.showAll || breakdown[this.property] != 0)
      .sort((a: Breakdown, b: Breakdown) => b[this.property] - a[this.property])
      .map(this.convertToBasicChartData.bind(this));

  }

  private convertToBasicChartData(breakdown: Breakdown): {
    name: String,
    value: any
  } {
    return {
      name: breakdown.label,
      value: breakdown[this.property]
    };
  }
}
