import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {isNumeric} from "rxjs/util/isNumeric";
import {RoutingService} from "../../../../service/routing/routing.service";
import {IBreadcrumb} from "../../../model/breadcrumb.model";

@Injectable()
export class AccountBreadcrumbService {

  static readonly BREADCRUMB_MAPPING = {
    account: {
      label: 'Accounts',
      url: () => '/account'
    },
    budget: {
      label: 'Budget',
      url: (previous: IBreadcrumb) => previous.url + '/budget'
    },
    breakdown: {
      label: 'Breakdown',
      url: (previous: IBreadcrumb) => previous.url + '/breakdown'
    },
    transaction: {
      label: 'Transactions',
      url: (previous: IBreadcrumb) => previous.url + '/transaction'
    },
    details: {
      label: 'Details',
      url: (previous: IBreadcrumb) => previous.url + '/details'
    }
  };

  constructor(private router: Router, private routingService: RoutingService) { }

  getCurrentContext(): any {
    let url = this.router.url;
    let accountUrlRegex = /\/account\/\d+\/(.+)*/;
    let result = accountUrlRegex.exec(url);
    let context = [];

    if (result && result[1]) {
      context = result[1].split('/');
    }

    return context;
  }

  getBreadcrumbs(): IBreadcrumb[] {
    let urlSegments: string[] = this.router.url.split('/');
    return urlSegments.reduce(this.createBreadcrumbFrom.bind(this), []);
  }

  private createBreadcrumbFrom(breadcrumbs: IBreadcrumb[], urlSegment: string): IBreadcrumb[] {
    let first = breadcrumbs.length == 0;
    let previous = breadcrumbs[breadcrumbs.length - 1];

    if (AccountBreadcrumbService.BREADCRUMB_MAPPING.hasOwnProperty(urlSegment)) {
      this.pushMappedBreadcrumb(urlSegment, breadcrumbs, previous);
    } else if (!first && isNumeric(urlSegment)) {
      this.identifyNumericAndPush(previous, breadcrumbs, urlSegment);
    }

    return breadcrumbs;
  }

  private pushMappedBreadcrumb(urlSegment: string, breadcrumbs: IBreadcrumb[], previous: IBreadcrumb) {
    let breadcrumbDetails = AccountBreadcrumbService.BREADCRUMB_MAPPING[urlSegment];
    breadcrumbs.push(<IBreadcrumb>{
      label: breadcrumbDetails.label,
      url: breadcrumbDetails.url(previous)
    });
  }

  private identifyNumericAndPush(previous: IBreadcrumb, breadcrumbs: IBreadcrumb[], urlSegment: string): void {
    switch (previous.label) {
      case 'Accounts':
        this.pushAccountBreadcrumb(breadcrumbs, previous, urlSegment);
        break;
    }
  }

  private pushAccountBreadcrumb(breadcrumbs: IBreadcrumb[], previous: IBreadcrumb, urlSegment: string) {
    let account = <Account>this.routingService.getData('account');
    breadcrumbs.push(<IBreadcrumb>{
      label: account.name,
      url: previous.url + `/${urlSegment}`
    });
  }
}
