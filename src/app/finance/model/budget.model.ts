import {BaseModel} from "./base.model";

export class Budget extends BaseModel {

  id: Number;
  name: String;
  description: String;
  amount: Number;
  frequency: String;
  balance: Number;
  type: String;

  constructor()
  constructor(id: Number, name: String)
  constructor(id: Number, name: String, amount: Number, frequency: String)
  constructor(id?: Number, name?: String, amount?: Number, frequency?: String, description?: String) {

    super();

    this.id = id;
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.frequency = frequency
  }
}
