import {Allocation} from "./allocation.model";

export class Transaction {

  id: Number;
  date: Date;
  description: String;
  allocations: Allocation[] = [];
  total: Number;

  get descriptionText(): String {
    if (this.description) {
      return this.description
    } else {
      return this.allocations.map(allocation => allocation.name).sort().join(', ')
    }
  }
}
