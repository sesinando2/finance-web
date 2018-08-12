import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {BudgetModule} from "../../budget/budget.module";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RoutingService} from "../../../service/routing/routing.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {AllAccountChartComponent} from "../all-account-chart/all-account-chart.component";
import {BreakdownModule} from "../../breakdown/breakdown.module";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        NgxChartsModule,

        BudgetModule,
        BreakdownModule,

        RouterTestingModule,
        HttpClientTestingModule
      ],

      declarations: [
        DashboardComponent,

        AllAccountChartComponent
      ],

      providers: [RoutingService]
    })
    .compileComponents();

    let injector = getTestBed();
    let activatedRoute = injector.get(ActivatedRoute);
    spyOnProperty(activatedRoute, 'parent', 'get').and.returnValue(activatedRoute);
    activatedRoute.data = Observable.of({
      accountList: [],
      breakdownList: [],
      accountTrends: []
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
