import {Injectable} from '@angular/core';
import {Allocation} from "../../../model/allocation.model";

@Injectable()
export class AllocationService {

  constructor() { }

  createAllocationsFrom(objectArray: Object[]): Allocation[] {
    return objectArray.map(this.createAllocationFrom.bind(this));
  }

  createAllocationFrom(object: Object): Allocation {
    return Object.assign(new Allocation(), object);
  }
}
