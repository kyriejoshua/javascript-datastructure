import LinkedNode, { TLinkedNode } from './LinkedNode';

export interface ICompareFunc<T> {
  (node: TLinkedNode<T>): boolean;
}

export default class LinkedList<T> {
  protected count = 0;
  protected head: TLinkedNode<T> = null;
  protected isStrictEqual = false; // 是否严格相等，用于查找等行为

  constructor(head: TLinkedNode<T> = null, count = 0, isStrictEqual = false) {
    this.head = head;
    this.count = count;
    this.isStrictEqual = isStrictEqual;
  }

  /**
   * @description: 判断两个节点的内容是否相等
   * 优先使用外部定义的比较函数，其次内部直接进行元素的比较
   * @param {TLinkedNode<T>} node
   * @param {T} element
   * @param {ICompareFunc<T>} func
   * @return {boolean}
   */
  private isElementEqual(node: TLinkedNode<T>, element: T, func?: ICompareFunc<T>): boolean {
    // 如果有自定义的比较函数，就直接使用
    if (func) return func(node);

    // 根据内置的深浅比较类型来判断是否相等
    const isEqual = this.isStrictEqual
      ? element === node?.element
      : JSON.stringify(element) === JSON.stringify(node?.element);

    return isEqual;
  }

  /**
   * @description: 根据元素内容获取对应的索引
   * @param {T} element
   * @param {ICompareFunc<T>} func
   * @return {number}
   */
  private indexOf(element: T, func?: ICompareFunc<T>): number {
    let current: TLinkedNode<T> = this.head;
    let i = 0;
    while (i < this.count) {
      if (this.isElementEqual(current, element, func)) return i;

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
  private isOverflow(index: number): boolean {
    return index < 0 || index > this.count;
  }

  /**
   * @description: 根据索引获取结点
   * @param {number} index
   * @return {TLinkedNode<T>}
   */
  public getLinkedNodeByIndex(index: number): TLinkedNode<T> {
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
  public getElementByIndex(index: number): T | undefined {
    return this.getLinkedNodeByIndex(index)?.element;
  }

  /**
   * @description: 根据元素值找到结点
   * @param {T} element
   * @param {ICompareFunc<T>} func
   * @return {TLinkedNode<T>}
   */
  public find(element: T, func?: ICompareFunc<T>): TLinkedNode<T> {
    let node: TLinkedNode<T> = this.head;
    while (node !== null) {
      if (this.isElementEqual(node, element, func)) {
        break;
      }
      node = node.next;
    }

    return node;
  }

  /**
   * @description: 在链表末尾推入元素
   * @param {T} element
   * @return {number}
   */
  public add(element: T): number {
    const node: TLinkedNode<T> = new LinkedNode(element);

    // 如果头结点为空则直接设置成头结点
    if (this.head === null) {
      this.head = node;
    } else {
      // 找到末尾的结点
      const current: TLinkedNode<T> = this.getEnd();
      (current as LinkedNode<T>).next = node;
    }

    return ++this.count;
  }

  /**
   * @description: 在链表头结部插入元素
   * @param {T} element
   * @return {number}
   */
  public addByHead(element: T): number {
    const node: TLinkedNode<T> = new LinkedNode(element);

    // 如果头结点为空则直接设置成头结点
    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
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

    const node = new LinkedNode(element);

    // 设置头结点或者正常插入
    if (index === 0) {
      this.head = node;
    } else {
      const prevNode = this.getLinkedNodeByIndex(index - 1);
      node.next = prevNode.next;
      (prevNode as LinkedNode<T>).next = node;
    }
    this.count++;

    return true;
  }

  /**
   * @description: 在指定索引处删除结点
   * @param {number} index
   * @return {T|null}
   */
  public removeByIndex(index: number): T | null {
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
   * @description: 移除链表末尾的元素
   * @return {T|null}
   */
  public removeEnd(): T | null {
    return this.removeByIndex(this.size() - 1);
  }

  /**
   * @description: 根据结点值移除元素
   * @param {T} element
   * @param {ICompareFunc<T>} func
   * @return {T|null}
   */
  public remove(element: T, func?: ICompareFunc<T>): T | null {
    const index: number = this.indexOf(element, func);
    return this.removeByIndex(index);
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
   * @description: 获取头结点
   * @return {TLinkedNode<T>}
   */
  public getHead(): TLinkedNode<T> {
    return this.head;
  }

  /**
   * @description: 获取尾结点
   * @return {TLinkedNode}
   */
  public getEnd(): TLinkedNode<T> {
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
   * @description: 把单链表的所有元素保存成数组
   * @return {T[]}
   */
  public toArray(): T[] {
    const arr: T[] = [];
    let current: TLinkedNode<T> = this.head;

    while (current !== null) {
      arr.push(current.element);
      current = current.next;
    }

    return arr;
  }

  /**
   * @description: 把所有结点转成字符串
   * @return {string}
   */
  public toString(): string {
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

type TLinkedList = typeof LinkedList;

export { LinkedNode, TLinkedNode, TLinkedList };
