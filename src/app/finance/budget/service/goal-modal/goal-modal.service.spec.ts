import {inject, TestBed} from '@angular/core/testing';
import {NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {GoalModalService} from './goal-modal.service';

describe('GoalModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot()
      ],

      providers: [
        GoalModalService,
        NgbModal
      ]
    });
  });

  it('should be created', inject([GoalModalService], (service: GoalModalService) => {
    expect(service).toBeTruthy();
  }));
});
