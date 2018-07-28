import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Transaction} from '../../../model/transaction.model';
import {Budget} from '../../../model/budget.model';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {Account} from '../../../model/account.model';
import {Subscription} from 'rxjs/Subscription';
// noinspection TsLint
import {TransactionAllocationModalService} from '../../../transaction/service/transaction-allocation-modal/transaction-allocation-modal.service';
import {Allocation} from '../../../model/allocation.model';
// noinspection TsLint
import {TransactionAllocationChartComponent} from '../../../transaction/component/transaction-allocation-chart/transaction-allocation-chart.component';
import {TransactionService} from '../../../transaction/service/transaction/transaction.service';

@Component({
  selector: 'app-account-transaction-new',
  templateUrl: './account-transaction-new.component.html',
  styleUrls: ['./account-transaction-new.component.scss']
})
export class AccountTransactionNewComponent implements OnInit, OnDestroy{

  @ViewChild('allocationChart') allocationChart: TransactionAllocationChartComponent;

  form: FormGroup = new FormGroup({});
  account: Account = new Account();
  transaction: Transaction = new Transaction();
  budgetList: Budget[] = [];
  currentFrequency: string;

  private subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private transactionService: TransactionService,
              private transactionAllocationModalService: TransactionAllocationModalService) { }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(this.updateData.bind(this));
    this.subscription.add(this.route.parent.parent.data.subscribe(this.updateParentData.bind(this)));
    this.subscription.add(this.route.params.subscribe(this.updateParams.bind(this)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get filteredBudgetList() {
    return this.budgetList.filter((budget) =>
      !this.transaction.allocations.find((allocation) => allocation.name === budget.name));
  }

  onFormUpdated(form: FormGroup) {
    this.form = form;
    this.cd.detectChanges();
  }

  newAllocation(): void {
    this.transactionAllocationModalService
      .open(this.transaction)
      .then(this.addAllocation.bind(this))
      .catch(() => this.allocationChart.updateChartData());
  }

  onBudgetSelected(budget: Budget) {
    const allocation = new Allocation(budget.name, budget.amount);
    this.addAllocation(allocation);
  }

  onAllocationSelected(allocation: Allocation) {
    this.transactionAllocationModalService
      .open(this.transaction, allocation)
      .then((source) => this.updateAllocation(allocation, source))
      .catch(() => this.allocationChart.updateChartData());
  }

  get allowSave() {
    return this.form.valid && this.transaction.allocations.length > 0;
  }

  get allowCancel() {
    return !this.form.pending;
  }

  save() {
    if (this.allowSave) {
      Object.assign(this.transaction, this.form.value);
      this.transactionService.save(this.account.id, this.transaction)
        .subscribe(this.navigateToTransactionList.bind(this));
    }
  }

  cancel() {
    if (this.allowCancel) {
      return this.navigateToTransactionList();
    }
  }

  private navigateToTransactionList(): Promise<boolean> {
    return this.router.navigate(['/account', this.account.id, 'transaction']);
  }

  private addAllocation(allocation: Allocation): void {
    this.transaction.allocations.push(allocation);
    this.allocationChart.updateChartData();
  }

  private updateAllocation(target: Allocation, source: Allocation) {
    Object.assign(target, source);
    this.allocationChart.updateChartData();
  }

  private updateData(data: Data): void {
    this.budgetList = data['budgetList'];
    this.cd.detectChanges();
  }

  private updateParentData(data: Data) {
    this.account = data['account'];
    this.cd.detectChanges();
  }

  private updateParams(params: Params): void {
    this.currentFrequency = params['frequency'];
    this.cd.detectChanges();
  }
}
