import {BaseModel} from './base.model';

export class Allocation extends BaseModel {

  id: Number;
  name: String;
  description: String;
  amount: Number;
  tags: string[] = [];

  constructor();
  constructor(name: String, amount: Number)
  constructor(name?: String, amount?: Number) {
    super();

    this.name = name;
    this.amount = amount;
  }
}
