import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Rx";

import {GoalService} from "../../../budget/service/goal/goal.service";
import {GoalModalService} from "../../../budget/service/goal-modal/goal-modal.service";

import {Account} from "../../../model/account.model";
import {Goal} from "../../../model/goal.model";

@Component({
  selector: 'app-account-goal',
  templateUrl: './account-goal.component.html',
  styleUrls: ['./account-goal.component.scss']
})
export class AccountGoalComponent implements OnInit, OnDestroy {

  @Input() account: Account;
  @Input() goalList: Goal[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private goalService: GoalService,
              private goalModalService: GoalModalService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  newGoal(): void {
    this.goalModalService.open(this.account)
      .then((goal: Goal) => this.goalService.createGoal(this.account.id, goal).toPromise())
      .catch(() => { /* Ignore */ });
  }

  selectGoal(goal: Goal) {
    this.goalModalService.open(this.account, goal, 'Edit Goal')
      .then((goal: Goal) => this.goalService.update(goal).toPromise())
      .catch(() => { /* Ignore */ });
  }
}
