import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from "@angular/router";

@Injectable()
export class RoutingService {

  private readonly FREQUENCY: string = 'frequency';

  constructor(private router: Router) { }

  getData(name: string, route: ActivatedRouteSnapshot = this.router.routerState.snapshot.root): any {
    let data = route.data[name];
    if (data) return data;
    if (route.firstChild) {
      return this.getData(name, route.firstChild);
    } else {
      return null;
    }
  }

  getParam(name: string, route: ActivatedRouteSnapshot = this.router.routerState.snapshot.root): any {
    let param = route.params[name];
    if (param) return param;
    if (route.firstChild) {
      return this.getParam(name, route.firstChild);
    } else {
      return null;
    }
  }

  get currentFrequency(): string {
    let currentFrequency = this.getParam(this.FREQUENCY);

    if (!currentFrequency) {
      currentFrequency = localStorage.getItem(this.FREQUENCY);
    }

    if (currentFrequency) {
      localStorage.setItem(this.FREQUENCY, currentFrequency)
      return currentFrequency;
    }

    return 'monthly';
  }
}
