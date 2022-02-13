/**
 * @description: 链表的节点
 * @return {LinkedNode<T>}
 */
export default class LinkedNode<T> {
  public element: T;
  public next: TLinkedNode<T>;

  constructor(element: T, next: TLinkedNode<T> = null) {
    this.element = element;
    this.next = next;
  }
}

export type TLinkedNode<T> = LinkedNode<T> | null;
