import DuLinkedNode, { TDuLinkedNode } from './DuLinkedNode';

export default class DuLinkedList<T> {
  protected count = 0;
  protected head: TDuLinkedNode<T> = null;

  /**
   * @description: 索引是否溢出或不合法
   * @param {number} index
   * @return {boolean}
   */
  private isOverflow(index: number): boolean {
    return index < 0 || index > this.count;
  }

  /**
   * @description: 根据元素内容获取对应的索引
   * @param {T} element
   * @return {number}
   */
  public indexOf(element: T): number {
    let current: TDuLinkedNode<T> = this.head;
    let i = 0;
    while (i < this.count) {
      if (element === current?.element) return i;
      current = (current as DuLinkedNode<T>).next;
      i++;
    }
    return -1;
  }

  /**
   * @description: 根据索引获取结点
   * @param {number} index
   * @return {TDuLinkedNode<T>}
   */
  public getLinkedNodeByIndex(index: number): TDuLinkedNode<T> {
    if (this.isOverflow(index)) return null;

    if (index === 0) {
      return this.head;
    }
    let i = 1;
    let current: TDuLinkedNode<T> = (this.head as DuLinkedNode<T>).next;
    let prev: TDuLinkedNode<T> = this.head;
    while (i < index) {
      prev = (prev as DuLinkedNode<T>).next;
      current = (current as DuLinkedNode<T>).next;
      i++;
    }

    return current;
  }

  /**
   * @description: 双向链表的结点移除比较简单，重置指针即可
   * @param {TDuLinkedNode<T>} current
   * @return {TDuLinkedNode<T>}
   */
  private removeElement(current: TDuLinkedNode<T>): TDuLinkedNode<T> {
    current.prev.next = current.next;
    if (current.next) current.next.prev = current.prev;
    current.next = null;
    current.prev = null;

    return current;
  }

  /**
   * @description: 在链表末尾插入元素
   * @param {T} element
   * @return {number}
   */
  public add(element: T): number {
    const node: TDuLinkedNode<T> = new DuLinkedNode(element);

    if (this.head === null) {
      this.head = node;
    } else {
      const endNode = this.getEnd();
      endNode.next = node;
      node.prev = endNode;
    }

    return ++this.count;
  }

  /**
   * @description: 插入结点
   * @param {T} element
   * @param {number} index
   * @return {boolean}
   */
  public insertByIndex(element: T, index: number): boolean {
    // 如果溢出或者索引为负，直接添加不成功
    if (this.isOverflow(index)) return false;

    const node = new DuLinkedNode(element);

    // 设置头结点或者正常插入
    if (index === 0) {
      this.head = node;
    } else {
      const prevNode = this.getLinkedNodeByIndex(index - 1);
      node.prev = prevNode;
      node.next = prevNode.next;
      prevNode.next = node;
    }
    this.count++;

    return true;
  }

  /**
   * @description: 根据元素值找到结点
   * @param {T} element
   * @return {TDuLinkedNode<T>}
   */
  public find(element: T): TDuLinkedNode<T> {
    let node: TDuLinkedNode<T> = this.head;
    while (node !== null) {
      if (node.element === element) {
        break;
      }
      node = node.next;
    }

    return node;
  }

  /**
   * @description: 在指定索引处删除节点
   * @param {number} index
   * @return {T|null}
   */
  removeByIndex(index: number): T | null {
    if (this.isOverflow(index)) return null;
    let current: TDuLinkedNode<T>;

    if (index === 0) {
      current = this.head;
      this.head = this.head.next;
      this.head.prev = current;
    } else {
      current = this.getLinkedNodeByIndex(index);
      this.removeElement(current);
    }

    this.count--;

    return current.element;
  }

  /**
   * @description: 根据元素值移除结点
   * @param {T} element
   * @return {T}
   */
  public remove(element: T): T {
    return this.removeElement(this.find(element))?.element;
  }

  /**
   * @description: 返回链表的头结点
   * @return {TDuLinkedNode<T>}
   */
  public getHead(): TDuLinkedNode<T> {
    return this.head;
  }

  /**
   * @description: 获取链表的最后一个结点
   * @return {TDuLinkedNode<T>}
   */
  public getEnd(): TDuLinkedNode<T> {
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
  public clear(): void {
    this.count = 0;
    this.head = null;
  }

  /**
   * @description: 链表的结点数量
   * @return {number}
   */
  public size(): number {
    return this.count;
  }

  /**
   * @description: 链表是否为空
   * @return {boolean}
   */
  public isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * @description: 把所有结点转成字符串
   * @return {string}
   */
  public toString(): string {
    if (!this.getHead()) return '';

    let current: TDuLinkedNode<T> = this.head;
    let str = '';
    while (current !== null) {
      str += `${current.element}`;
      current = current.next;
      if (current) str += ' ⇌ ';
    }

    return str;
  }
}
