/**
 * @description: Queue
 * 模拟的是 Java 的实现
 * @param {T}
 * @return {Queue}
 */
export default class Queue<T> {
  private queueList: T[] = [];
  private length: number = Number.MAX_SAFE_INTEGER;

  /**
   * @description: 检查队列是否为空
   * @return {boolean}
   */
  private isEmpty(): boolean {
    return this.queueList.length === 0;
  }

  /**
   * @description: 检查队列是否溢出
   * @return {boolean}
   */
  private isOverflow(): boolean {
    return this.queueList.length + 1 > this.length;
  }

  /**
   * @description: 获取队列的长度
   * @return {number}
   */
  public size(): number {
    return this.queueList.length;
  }

  /**
   * @description: 往队列中添加元素
   * 如果遇到问题就抛出异常
   * @param {T} value
   * @return {void}
   */
  public add(value: T): void {
    if (this.isOverflow()) {
      throw new Error('The Queue is overflow!');
    }
    this.queueList.push(value);
  }

  /**
   * @description: 从队列中移除队首元素
   * 如果遇到问题就抛出异常
   * @return {T}
   */
  public remove(): T {
    if (this.isEmpty()) {
      throw new Error('The Queue is empty!');
    }
    return this.queueList.shift();
  }

  /**
   * @description: 从队列中取队首元素
   * 如果遇到问题就抛出异常
   * @return {T}
   */
  public element(): T {
    if (this.isEmpty()) {
      throw new Error('The Queue is empty!');
    }

    const [firstElement] = this.queueList;
    return firstElement;
  }

  /**
   * @description: 往队列中添加元素
   * 如果遇到问题就返回 false
   * @param {T} value
   * @return {boolean}
   */
  public offer(value: T): boolean {
    if (this.isOverflow()) {
      return false;
    }
    this.queueList.push(value);
    return true;
  }

  /**
   * @description: 从队列中取队首元素
   * 如果遇到问题就返回 false
   * @return {T|boolean}
   */
  public poll(): T | boolean {
    if (this.isEmpty()) {
      return false;
    }
    return this.queueList.shift();
  }

  /**
   * @description: 从队列中取队首元素
   * 如果遇到问题就返回 false
   * @return {T|boolean}
   */
  public peek(): T | boolean {
    if (this.isEmpty()) {
      return false;
    }
    const [firstElement] = this.queueList;
    return firstElement;
  }
}

/**
 * @description: 用两个栈来实现最基础的队列
 * @param {T}
 * @return {MyQueue}
 */
export class MyQueue<T> {
  private inStack: T[];
  private outStack: T[];

  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  /**
   * @description: 从第一个栈里弹出数据到第二个栈，此时第二个栈再弹出就是队列的顺序
   * @return {void}
   */
  private in2out(): void {
    while (this.inStack.length) {
      this.outStack.push(this.inStack.pop());
    }
  }

  /**
   * @description: 往队末推入元素
   * @param {T} val
   * @return {void}
   */
  public push(val: T): void {
    this.inStack.push(val);
  }

  /**
   * @description: 弹出队首元素
   * @return {T}
   */
  public poll(): T {
    if (!this.outStack.length) {
      this.in2out();
    }

    return this.outStack.pop();
  }

  /**
   * @description: 取队首元素
   * @return {T}
   */
  public peek(): T {
    if (!this.outStack.length) {
      this.in2out();
    }

    return this.outStack[this.outStack.length - 1];
  }

  /**
   * @description: 队列是否为空
   * @return {boolean}
   */
  public empty(): boolean {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}
