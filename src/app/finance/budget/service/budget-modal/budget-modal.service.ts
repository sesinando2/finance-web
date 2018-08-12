import {Injectable} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Budget} from "../../../model/budget.model";
import {BudgetModalComponent} from "../../component/budget-modal/budget-modal.component";
import {Account} from "../../../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class BudgetModalService {

  constructor(private modalService: NgbModal) { }

  open(account: Account, budget: Budget = new Budget(), title: String = 'New Budget'): Promise<Budget> {
    let modal = this.modalService.open(BudgetModalComponent);
    modal.componentInstance.account = account;
    modal.componentInstance.title = title;
    modal.componentInstance.budget = budget;
    return modal.result;
  }
}
