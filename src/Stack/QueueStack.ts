/**
 * @description: 两个队列实现栈
 * @param {T}
 * @return {MyStack}
 */
export default class QueueStack<T> {
  private outQueue: T[]; // 用于保存栈的弹出顺序
  private inQueue: T[];

  constructor() {
    this.outQueue = [];
    this.inQueue = [];
  }

  /**
   * @description: 通过两次转换使得队列顺序变成栈的顺序
   * [3, 1], [] => [3, 1], [5] => [], [5, 3, 1] => [5, 3, 1], []
   * @return {void}
   */
  in2out(): void {
    while (this.outQueue.length) {
      this.inQueue.push(this.outQueue.shift());
    }
    while (this.inQueue.length) {
      this.outQueue.push(this.inQueue.shift());
    }
  }

  /**
   * @description: 往栈中推入数据
   * @param {T} value
   * @return {void}
   */
  push(value: T): void {
    this.inQueue.push(value);
    this.in2out();
  }

  /**
   * @description: 栈中弹出数据
   * @return {T}
   */
  pop(): T {
    return this.outQueue.shift();
  }

  /**
   * @description: 取栈尾的数据
   * @return {T}
   */
  top(): T {
    return this.outQueue[0];
  }

  /**
   * @description: 栈是否为空
   * @return {boolean}
   */
  empty(): boolean {
    return !this.outQueue.length;
  }
}
