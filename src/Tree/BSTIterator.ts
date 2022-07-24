import TreeNode from './BinaryTree';

/**
 * @description: 二叉搜索树的迭代器
 */
class BSTIterator<T> {
  private iterator: T[];
  private index: number;

  /**
   * @description: 初始化迭代器
   * @param {TreeNode} root
   */
  constructor(root: TreeNode<T> | null) {
    this.index = -1;
    this.iterator = this.buildIterator(root);
  }

  /**
   * @description: 根据二叉搜索树的中序遍历构建顺序数组
   * @param {TreeNode} root
   * @return {number[]}
   */
  private buildIterator(root: TreeNode<T> | null): T[] {
    if (root === null) return [];

    const stack: TreeNode<T>[] = [];
    const iterator: T[] = [];
    let node: TreeNode<T> = root;

    while (stack.length || node) {
      while (node) {
        stack.push(node);
        node = node.left;
      }
      const current = stack.pop();
      iterator.push(current.value);
      node = current.right;
    }

    return iterator;
  }

  /**
   * @description: 返回数组形式迭代器的浅拷贝
   * @return {T[]}
   */
  public toArray(): T[] {
    return this.iterator.slice();
  }

  /**
   * @description: 返回下一个节点的值
   * @return {T}
   */
  public next(): T {
    return this.iterator[++this.index];
  }

  /**
   * @description: 检测是否还有下一个节点
   * @return {boolean}
   */
  public hasNext(): boolean {
    return this.index < this.iterator.length - 1;
  }
}

export default BSTIterator;
