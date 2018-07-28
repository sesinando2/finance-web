import {NgbDateAdapter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export class ApiDateAdapter extends NgbDateAdapter<Number> {

  fromModel(model: Number): NgbDateStruct {
    let date = new Date(<number>model);

    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }

  toModel(date: NgbDateStruct): Number {
    if (!date) {
      return null;
    }

    return new Date(date.year, date.month - 1, date.day).getTime();
  }
}
