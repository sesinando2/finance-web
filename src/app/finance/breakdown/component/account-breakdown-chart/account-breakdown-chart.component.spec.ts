import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountBreakdownChartComponent} from './account-breakdown-chart.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";

describe('AccountBreakdownChartComponent', () => {
  let component: AccountBreakdownChartComponent;
  let fixture: ComponentFixture<AccountBreakdownChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NgxChartsModule,
        NgbModule.forRoot(),
        RouterTestingModule
      ],

      declarations: [AccountBreakdownChartComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBreakdownChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
