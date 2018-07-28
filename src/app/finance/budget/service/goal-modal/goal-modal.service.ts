import {Injectable} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Goal} from "../../../model/goal.model";
import {GoalModalComponent} from "../../component/goal-modal/goal-modal.component";
import {Account} from "../../../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class GoalModalService {

  constructor(private modalService: NgbModal) { }

  open(account: Account, goal: Goal = new Goal(), title: String = 'New Goal'): Promise<Goal> {
    let modal = this.modalService.open(GoalModalComponent);
    modal.componentInstance.account = account;
    modal.componentInstance.title = title;
    modal.componentInstance.goal = goal;
    return modal.result;
  }
}
