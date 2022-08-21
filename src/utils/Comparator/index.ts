interface ICompareFunction {
  (...params: unknown[]): unknown;
}

/**
 * @description: 用于比较的工具类
 * @return {Comparator}
 */
export default class Comparator {
  private compare: ICompareFunction;

  constructor(compareFunction: ICompareFunction) {
    this.compare = compareFunction || (Comparator.defaultCompareFunction as ICompareFunction);
  }

  static defaultCompareFunction(a: number, b: number): number {
    if (a === b) return 0;

    return a < b ? -1 : 1;
  }

  public isEqual(a: number, b: number): boolean {
    return this.compare(a, b) === 0;
  }

  public lessThan(a: number, b: number): boolean {
    return this.compare(a, b) < 0;
  }

  public moreThan(a: number, b: number): boolean {
    return this.compare(a, b) > 0;
  }

  public lessThanOrEqual(a: number, b: number): boolean {
    return this.compare(a, b) <= 0;
  }

  public moreThanOrEqual(a: number, b: number): boolean {
    return this.compare(a, b) >= 0;
  }

  public reverse(): void {
    const originalCompare = this.compare;
    this.compare = (a, b) => originalCompare(b, a);
  }
}
