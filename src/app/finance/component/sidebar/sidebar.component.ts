import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoutingService} from "../../../service/routing/routing.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  currentFrequency: string;

  constructor(private routingService: RoutingService, private router: Router) { }

  ngOnInit() {
    this.watchCurrentFrequency();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private watchCurrentFrequency(): void {
    this.updateCurrentFrequency();
    this.subscription = this.router.events.subscribe(this.updateCurrentFrequency.bind(this));
  }

  private updateCurrentFrequency() {
    this.currentFrequency = this.routingService.currentFrequency;
  }
}
