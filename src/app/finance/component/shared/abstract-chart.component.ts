import {ChangeDetectorRef, DoCheck, Input} from "@angular/core";

export abstract class AbstractChartComponent implements DoCheck {

  @Input() container: any = null;
  @Input() height: any = 200;

  view: any = [0, 0];

  constructor(protected cd: ChangeDetectorRef) {}

  ngDoCheck() {
    if (!this.container) {
      return;
    }

    let width = this.container.offsetWidth - 30;

    if (width >= 0 && this.view[0] != width) {
      this.view = [width, this.height];
      this.cd.detectChanges();
    }
  }
}
