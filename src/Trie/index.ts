import TrieByArray from './TrieByArray';

export class ITrieNode<T> {
  data: T;
  children: { [key: string]: ITrieNode<T> };
  isEndingChar: boolean;
}

/**
 * @description: 前缀树节点
 * @return {*}
 */
export class TrieNode<T> implements ITrieNode<T> {
  public data: T;
  public children: { [key: string]: TrieNode<T> };
  public isEndingChar;

  constructor(data: T) {
    this.data = data;
    this.children = {};
    this.isEndingChar = false;
  }
}

/**
 * @description: 使用对象实现的前缀树
 * @return {*}
 */
export default class TrieByObject {
  private root: ITrieNode<string> = new TrieNode('/');

  /**
   * @description: 插入一个字符
   * @param {string} text
   * @return {void}
   */
  public insert(text: string): void {
    let currentTrieNode: ITrieNode<string> = this.root;
    for (const str of text) {
      if (!currentTrieNode.children[str]) {
        currentTrieNode.children[str] = new TrieNode(str);
      }
      currentTrieNode = currentTrieNode.children[str];
    }
    currentTrieNode.isEndingChar = true;
  }

  /**
   * @description: 在 Trie 树中查找一个字符串
   * @param {string} pattern
   * @return {boolean}
   */
  public search(pattern: string): boolean {
    let currentTrieNode: ITrieNode<string> = this.root;

    for (const str of pattern) {
      if (!currentTrieNode.children[str]) return false;
      currentTrieNode = currentTrieNode.children[str];
    }

    return currentTrieNode.isEndingChar;
  }

  /**
   * @description: 在 Trie 树中查找一个前缀字符串
   * @param {string} prefix
   * @return {boolean}
   */
  public startsWith(prefix: string): boolean {
    let currentTrieNode: ITrieNode<string> = this.root;

    for (const str of prefix) {
      if (!currentTrieNode.children[str]) return false;
      currentTrieNode = currentTrieNode.children[str];
    }
    return true;
  }
}

export { TrieByArray };
