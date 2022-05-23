import LinkedList, { LinkedNode } from '@/LinkedList/index';

export interface ICacheNode {
  key: number | string;
  val: unknown;
}

/**
 * @description: LRU 缓存，使用单链表结合哈希Map实现
 */
class LRUCacheByLinkedNode<T extends ICacheNode> {
  private capacity: number; // 标记容量
  private linkedList: LinkedList<T>;
  private hashMap: Map<ICacheNode['key'], ICacheNode['val']>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.linkedList = new LinkedList<T>();
    this.hashMap = new Map();
  }

  /**
   * @description: 根据 key 查找对应结点
   * @param {number|string} key
   * @return {LinkedNode<T>}
   */
  find(key: number | string): LinkedNode<T> {
    let node = this.linkedList.getHead();
    if (node?.element.key === key) return node;

    while (node && node.next !== null) {
      if (node.next.element.key === key) {
        const findedNode: LinkedNode<T> = node.next;
        node.next = node.next.next;
        findedNode.next = this.linkedList.getHead();
        this.linkedList = new LinkedList<T>(findedNode, this.linkedList.size());
        return findedNode;
      }
      node = node.next;
    }

    return null;
  }

  /**
   * @description: 根据 key 获取值
   * @param {number|string}
   * @return {unknown|-1}
   */
  get(key: number | string): unknown | -1 {
    if (this.hashMap.get(key) === undefined) return -1;

    const node = this.find(key);
    return node.element.val;
  }

  /**
   * @description: 更新对应的缓存
   * @param {number|string} key
   * @param {unknown} key
   * @return {void}
   */
  put(key: number | string, value: unknown): void {
    const updatedNode = this.find(key);
    // 更新的场景
    if (updatedNode) {
      updatedNode.element.val = value;
      this.hashMap.set(key, value);
      return;
    }
    // 新增的场景
    this.linkedList.addByHead({ key, val: value } as T);
    this.hashMap.set(key, value);

    if (this.linkedList.size() > this.capacity) {
      // 删除最后一个结点
      const endNode = this.linkedList.getEnd();
      this.linkedList.removeEnd();
      this.hashMap.delete(endNode.element.key);
    }

    return;
  }
}

export default LRUCacheByLinkedNode;
