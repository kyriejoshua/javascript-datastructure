export default class TreeNode<T> {
  public left: TreeNode<T> | null;
  public right: TreeNode<T> | null;
  public value: T;

  constructor(value?: T, left?: TreeNode<T> | null, right?: TreeNode<T> | null) {
    this.value = (value === undefined ? 0 : value) as T;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/**
 * @description: 前序遍历
 * @param {TreeNode<T>} tree
 * @return {void}
 */
export function preOrderTraversal<T>(tree: TreeNode<T>): void {
  console.log(tree.value);
  tree.left && preOrderTraversal(tree.left);
  tree.right && preOrderTraversal(tree.right);
}

/**
 * @description: 中序遍历
 * @param {TreeNode} tree
 * @return {void}
 */
export function inOrderTraversal<T>(tree: TreeNode<T>): void {
  console.log(tree.value);
  tree.left && preOrderTraversal(tree.left);
  tree.right && preOrderTraversal(tree.right);
}

/**
 * @description: 后序遍历
 * @param {TreeNode} tree
 * @return {void}
 */
export function postOrderTraversal<T>(tree: TreeNode<T>): void {
  tree.left && preOrderTraversal(tree.left);
  tree.right && preOrderTraversal(tree.right);
  console.log(tree.value);
}
