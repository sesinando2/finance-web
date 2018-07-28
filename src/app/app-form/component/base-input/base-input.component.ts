import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-base-input',
  templateUrl: './base-input.component.html',
  styleUrls: ['./base-input.component.scss']
})
export class BaseInputComponent implements OnInit {

  @Input() label: String;
  @Input() name: string;
  @Input() helpText: String;
  @Input() errorMessage: String;

  constructor() { }

  ngOnInit() {
  }

}
