import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {RoutingService} from "../../../../service/routing/routing.service";
import {Subscription} from "rxjs/Subscription";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-frequency-selector',
  templateUrl: './frequency-selector.component.html',
  styleUrls: ['./frequency-selector.component.scss']
})
export class FrequencySelectorComponent implements OnInit, OnDestroy {

  private static readonly knownFrequencies  = ['daily', 'weekly', 'monthly', 'annually'];

  currentFrequency: string;

  private subscription: Subscription;

  constructor(private router: Router, private routingService: RoutingService) { }

  ngOnInit() {
    this.updateCurrentFrequency();
    this.subscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateCurrentFrequency());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getRouterLink(frequency: string): any[] {
    let urlSegments = this.router.url.split('/').splice(1);
    let commands = ['/'];
    let lastIndex = this.getLastIndex(urlSegments);
    let base = urlSegments.splice(0, lastIndex);
    return commands.concat(base).concat(frequency);
  }

  getLastIndex(urlSegments: string[]): number {
    let lastElement = urlSegments[urlSegments.length - 1];
    let lastElementIsAFrequency = FrequencySelectorComponent.knownFrequencies.lastIndexOf(lastElement) >= 0;
    return lastElementIsAFrequency ? urlSegments.length - 1 : urlSegments.length;
  }

  private updateCurrentFrequency(): void {
    this.currentFrequency = this.routingService.currentFrequency;
  }
}
