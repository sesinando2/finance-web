export abstract class BaseModel {

  hasDifferent(values: any): boolean {
    return Boolean(Object.keys(values).find((key) => values[key] != this[key]));
  }
}
