import LinkedNode, { TLinkedNode } from './LinkedNode';

export default class LinkedList<T> {
  protected count = 0;
  protected head: TLinkedNode<T> = null;

  /**
   * @description: 根据元素内容获取对应的索引
   * @param {T} element
   * @return {number}
   */
  indexOf(element: T): number {
    let current: TLinkedNode<T> = this.head;
    let i = 0;
    while (i < this.count) {
      if (element === current?.element) return i;
      current = (current as LinkedNode<T>).next;
      i++;
    }
    return -1;
  }

  /**
   * @description: 索引是否溢出或不合法
   * @param {number} index
   * @return {boolean}
   */
  isOverflow(index: number): boolean {
    return index < 0 || index > this.count;
  }

  /**
   * @description: 根据索引获取结点
   * @param {number} index
   * @return {TLinkedNode<T>}
   */
  getLinkedNodeByIndex(index: number): TLinkedNode<T> {
    if (this.isOverflow(index)) return null;

    if (index === 0) {
      return this.head;
    }
    let i = 1;
    let current: TLinkedNode<T> = (this.head as LinkedNode<T>).next;
    let prev: TLinkedNode<T> = this.head;

    while (i < index) {
      prev = (prev as LinkedNode<T>).next;
      current = (current as LinkedNode<T>).next;
      i++;
    }

    return current;
  }

  /**
   * @description: 根据结点索引获取结点值
   * @param {number} index
   * @return {T|undefined}
   */
  getElementByIndex(index: number): T | undefined {
    return this.getLinkedNodeByIndex(index)?.element;
  }

  /**
   * @description: 链表末尾推入元素
   * @param {T} element
   * @return {number}
   */
  add(element: T): number {
    const node: TLinkedNode<T> = new LinkedNode(element);

    // 如果头结点为空则直接设置成头结点
    if (this.head === null) {
      this.head = node;
    } else {
      // 找到末尾的结点
      const current: TLinkedNode<T> = this.getEnd();
      (current as LinkedNode<T>).next = node;
    }
    this.count++;

    return this.count;
  }

  /**
   * @description: 插入结点
   * @param {T} element
   * @param {number} index
   * @return {boolean}
   */
  insertByIndex(element: T, index: number): boolean {
    // 如果溢出或者索引为负，直接添加不成功
    if (this.isOverflow(index)) return false;

    const node = new LinkedNode(element);
    let i = 1;

    // 设置头结点或者正常插入
    if (index === 0) {
      this.head = node;
    } else {
      let current: TLinkedNode<T> = (this.head as LinkedNode<T>).next;
      let prev: TLinkedNode<T> = this.head;

      while (i < index) {
        prev = (prev as LinkedNode<T>).next;
        current = (current as LinkedNode<T>).next;
        i++;
      }
      node.next = current;
      (prev as LinkedNode<T>).next = node;
    }
    this.count++;

    return true;
  }

  /**
   * @description: 在指定索引处删除结点
   * @param {number} index
   * @return {T|null}
   */
  removeByIndex(index: number): T | null {
    // 如果溢出或者索引为负，删除失败
    if (this.isOverflow(index)) return null;
    let current: TLinkedNode<T>;

    if (index === 0) {
      current = this.head;
      this.head = (this.head as LinkedNode<T>).next;
    } else {
      const prev: TLinkedNode<T> = this.getLinkedNodeByIndex(index - 1);
      current = (prev as LinkedNode<T>).next;
      (prev as LinkedNode<T>).next = (current as LinkedNode<T>).next;
    }

    this.count--;

    return (current as LinkedNode<T>).element;
  }

  /**
   * @description: 根据结点值移除元素
   * @param {T} element
   * @return {T|null}
   */
  remove(element: T): T | null {
    const index: number = this.indexOf(element);
    return this.removeByIndex(index);
  }

  /**
   * @description: 链表的结点数量
   * @return {number}
   */
  size(): number {
    return this.count;
  }

  /**
   * @description: 链表是否为空
   * @return {boolean}
   */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * @description: 获取头结点
   * @return {TLinkedNode<T>}
   */
  getHead(): TLinkedNode<T> {
    return this.head;
  }

  /**
   * @description: 获取尾结点
   * @return {TLinkedNode}
   */
  getEnd(): TLinkedNode<T> {
    let current = this.head;

    while (current && current.next !== null) {
      current = current.next;
    }

    return current;
  }

  /**
   * @description: 清空当前链表
   * @return {void}
   */
  clear(): void {
    this.count = 0;
    this.head = null;
  }

  /**
   * @description: 把所有结点转成字符串
   * @return {string}
   */
  toString(): string {
    if (!this.getHead()) return '';

    let current: TLinkedNode<T> = this.head;
    let str = '';
    while (current !== null) {
      str += `${current.element}`;
      current = current.next;
      if (current) str += ' -> ';
    }

    return str;
  }
}
