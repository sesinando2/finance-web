import {Account} from "../../../model/account.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ChangeDetectorRef, OnDestroy, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";

export abstract class BaseAccountComponent implements OnInit, OnDestroy {

  protected form: FormGroup;
  protected formStatus = 'INVALID';
  protected formValues: {};
  account = new Account();
  protected subscription: Subscription;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.subscription = this.route.data.subscribe((data) => {
      this.account = data['account'];
      this.cd.detectChanges();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFormChange(form: FormGroup) {
    this.form = form;
  }

  onFormStatusChange(status) {
    this.formStatus = status;
    this.cd.detectChanges();
  }

  onFormValueChange(values) {
    this.formValues = values;
    this.cd.detectChanges();
  }

  get valid() {
    return this.formStatus == 'VALID';
  }

  isProcessing() {
    return this.formStatus == 'PENDING';
  }
}
