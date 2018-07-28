import {ChangeDetectorRef, Component} from '@angular/core';
import {BaseAccountComponent} from "../shared/base-account.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../service/account/account.service";

@Component({
  selector: 'app-account-new',
  templateUrl: './account-new.component.html',
  styleUrls: ['./account-new.component.scss']
})
export class AccountNewComponent extends BaseAccountComponent {

  private isSaving = false;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected cd: ChangeDetectorRef,
              protected accountService: AccountService) {
    super(route, router, cd);
  }

  isProcessing():boolean {
    return super.isProcessing() || this.isSaving;
  }

  get allowSave(): boolean {
    return !this.isProcessing() && this.valid;
  }

  save(): void {
    if (!this.allowSave) return;

    this.isSaving = true;
    this.accountService.post(this.formValues).subscribe((account) => {
      this.isSaving = false;
      return this.router.navigate(['account', account.id]);
    });
  }
}
