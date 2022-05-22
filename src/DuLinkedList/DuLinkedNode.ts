export default class DuLinkedNode<T> {
  public element: T;
  public next: TDuLinkedNode<T>;
  public prev: TDuLinkedNode<T>;

  constructor(element: T) {
    this.element = element;
    this.next = null;
    this.prev = null;
  }
}

export type TDuLinkedNode<T> = DuLinkedNode<T> | null;
