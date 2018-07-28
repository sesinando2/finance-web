import {ChangeDetectorRef, Component} from '@angular/core';
import {BaseAccountComponent} from "../shared/base-account.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../service/account/account.service";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent extends BaseAccountComponent {

  protected processing = false;

  constructor(protected router: Router,
              protected route: ActivatedRoute,
              protected cd: ChangeDetectorRef,
              protected accountService: AccountService) {
    super(route, router, cd);
  }

  ngOnInit() {
    this.subscription = this.route.parent.data.subscribe((data) => {
      this.account = data['account'];
      this.cd.detectChanges();
    });
  }

  isProcessing(): boolean {
    return super.isProcessing() || this.processing;
  }

  get allowSave(): boolean {
    return !this.isProcessing() && this.valid && this.account.hasDifferent(this.formValues);
  }

  get allowDelete(): boolean {
    return !this.isProcessing();
  }

  save(): void {
    if (!this.allowSave) return;

    this.processing = true;
    this.accountService.put(this.account.id, this.formValues).subscribe((account) => {
      this.account = account;
      this.processing = false;
      this.cd.detectChanges();
    });
  }

  delete(): void {
    if (!this.allowDelete) return;

    this.processing = true;
    this.accountService.delete(this.account.id).subscribe(() => {
      this.processing = false;
      return this.router.navigate(['/account']);
    })
  }
}
