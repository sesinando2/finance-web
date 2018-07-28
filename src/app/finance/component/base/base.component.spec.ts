import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseComponent} from './base.component';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {RouterTestingModule} from "@angular/router/testing";
import {RoutingService} from "../../../service/routing/routing.service";

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],

      declarations: [
        SidebarComponent,

        BaseComponent
      ],

      providers: [
        RoutingService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
