import {BaseModel} from './base.model';

export class Account extends BaseModel {

  id: Number;
  name: String;
  description: String;
  balance: Number;

  constructor();
  constructor(id?: Number, name?: String);
  constructor(id?: Number, name?: String, description?: String) {
    super();

    this.id = id;
    this.name = name;
    this.description = description;
  }
}
