import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Account} from "../../../model/account.model";
import {RoutingService} from "../../../../service/routing/routing.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'app-account-links',
  templateUrl: './account-links.component.html',
  styleUrls: ['./account-links.component.scss']
})
export class AccountLinksComponent implements OnInit, OnDestroy {

  @Input() account: Account;

  currentFrequency: string;
  private subscription: Subscription;

  constructor(private routingService: RoutingService, private router: Router) { }

  ngOnInit() {
    this.updateFrequency();
    this.subscription = this.router.events.subscribe(this.updateFrequency.bind(this));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private updateFrequency() {
    this.currentFrequency = this.routingService.currentFrequency;
  }
}
