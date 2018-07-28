import {inject, TestBed} from '@angular/core/testing';

import {AccountBreadcrumbService} from './account-breadcrumb.service';
import {RouterTestingModule} from "@angular/router/testing";
import {RoutingService} from "../../../../service/routing/routing.service";

describe('AccountBreadcrumbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        RoutingService,

        AccountBreadcrumbService
      ]
    });
  });

  it('should be created', inject([AccountBreadcrumbService], (service: AccountBreadcrumbService) => {
    expect(service).toBeTruthy();
  }));
});
