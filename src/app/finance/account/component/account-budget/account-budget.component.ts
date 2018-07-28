import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Data, Params} from "@angular/router";
import {BudgetModalService} from "../../../budget/service/budget-modal/budget-modal.service";
import {BudgetService} from "../../../budget/service/budget/budget.service";

import {Account} from "../../../model/account.model";
import {Budget} from "../../../model/budget.model";
import {Goal} from "../../../model/goal.model";

import {GoalService} from "../../../budget/service/goal/goal.service";

import {AccountGoalComponent} from "../account-goal/account-goal.component";

import {Observable, Subscription} from "rxjs/Rx";
import {concatMap} from "rxjs/operators";

@Component({
  selector: 'app-account-budget',
  templateUrl: './account-budget.component.html',
  styleUrls: ['./account-budget.component.scss']
})
export class AccountBudgetComponent implements OnInit, OnDestroy {

  @ViewChild('accountGoal') accountGoal: AccountGoalComponent;

  currentFrequency: string = 'monthly';
  account: Account = new Account();
  goalList: Goal[] = [];
  budgetList: Budget[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private budgetModalService: BudgetModalService,
              private budgetService: BudgetService,
              private goalService: GoalService) { }

  ngOnInit() {
    this.subscription.add(this.route.data.subscribe(this.updateData.bind(this)));
    this.subscription.add(this.route.params.subscribe(this.updateParams.bind(this)));
    this.subscription.add(this.subscribeToChanges());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  newBudget(): void {
    this.budgetModalService.open(this.account)
      .then((budget: Budget) =>
        this.budgetService.createBudget(this.account.id, budget).toPromise())
      .catch(() => { /* Ignore */ });
  }

  onBudgetSelected(budget: Budget) {
    if (budget.type == 'Goal') {
      this.goalService.get(budget.id).subscribe((goal: Goal) => {
        this.accountGoal.selectGoal(goal);
      });
      return;
    }

    this.budgetService.get(budget.id).subscribe((budget: Budget) => {
      this.budgetModalService.open(this.account, budget, 'Edit Budget')
        .then((budget: Budget) => this.budgetService.update(budget).toPromise())
        .catch(() => { /* Ignore */ });
    });
  }

  private updateData(data: Data) {
    this.account = data['account'];
    this.goalList = data['goalList'];
    this.budgetList = data['budgetList'];
    this.cd.detectChanges();
  }

  private updateParams(params: Params) {
    this.currentFrequency = params['frequency'];
    this.cd.detectChanges();
  }

  private subscribeToChanges(): Subscription {
    return Observable.merge(this.budgetService.budgetUpdated$, this.goalService.goalUpdated$)
      .pipe(concatMap(this.reloadBudgetList.bind(this)))
      .subscribe((response) => {
        this.budgetList = response[0];
        this.goalList = response[1];
        this.cd.detectChanges();
      });
  }

  private reloadBudgetList(): Observable<any[]> {
    let budgetList = this.budgetService.getBudgetList(this.account.id, this.currentFrequency);
    let goalList = this.goalService.getGoalList(this.account.id, this.currentFrequency);
    return Observable.combineLatest(budgetList, goalList);
  }
}
