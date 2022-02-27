/**
 * @description: Stack
 * @param {len} number
 * @return {Stack}
 */
export default class Stack<T> {
  private stackList: T[];
  private length: number;
  private count: number;

  constructor(len: number) {
    this.stackList = [];
    this.length = len;
    this.count = 0;
  }

  /**
   * @description: 往栈中推入数据
   * @param {T} value
   * @return {boolean}
   */
  public push(value: T): boolean {
    // 当前栈已满
    if (this.count === this.length) {
      return false;
    }
    this.stackList[this.count] = value;
    this.count++;
    return true;
  }

  /**
   * @description: 从栈中弹出数据
   * @return {T|undefined}
   */
  public pop(): T | undefined {
    const value = this.peek();
    this.count--;
    this.stackList.length = this.count;
    return value;
  }

  /**
   * @description: 取栈顶元素但不弹出
   * @param {T}
   * @return {T|undefined}
   */
  public peek(): T | undefined {
    if (!this.count) return undefined;
    return this.stackList[this.count - 1];
  }

  /**
   * @description: 压栈操作的别名
   * @param {T} value
   * @return {boolean}
   */
  public addFirst(value: T): boolean {
    return this.push(value);
  }

  /**
   * @description: 取栈顶的元素的别名函数
   * @return {T|undefined}
   */
  public removeFirst(): T | undefined {
    return this.pop();
  }

  /**
   * @description: 取栈顶元素
   * @return {T|undefined}
   */
  public peekFirst(): T | undefined {
    return this.peek();
  }
}
