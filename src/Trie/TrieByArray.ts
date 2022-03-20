class ITrieNode<T> {
  data: T;
  children: ITrieNode<T>[];
  isEndingChar: boolean;
}

class TrieNodeByArray<T> implements ITrieNode<T> {
  public data: T;
  public children: ITrieNode<T>[] = new Array(26).fill(null);
  public isEndingChar = false;

  constructor(data: T) {
    this.data = data;
    this.children = [];
  }
}

/**
 * @description: 使用数组存储字典的前缀树
 * 比较耗费内存空间
 * @return {*}
 */
export default class TrieByArray {
  private root: ITrieNode<string> = new TrieNodeByArray('/');
  private charAtA: number = 'a'.charCodeAt(0);

  /**
   * @description: 插入一个字符
   * @param {string} text
   * @return {void}
   */
  public insert(text: string): void {
    let currentTrieNode: ITrieNode<string> = this.root;
    for (const str of text) {
      const index = str.charCodeAt(0) - this.charAtA;
      if (!currentTrieNode.children[index]) {
        currentTrieNode.children[index] = new TrieNodeByArray(str);
      }
      currentTrieNode = currentTrieNode.children[index];
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
      const index = str.charCodeAt(0) - this.charAtA;
      if (!currentTrieNode.children[index]) return false;
      currentTrieNode = currentTrieNode.children[index];
    }
    if (currentTrieNode.isEndingChar === false) return false;
    return true;
  }

  /**
   * @description: 在 Trie 树中查找一个前缀字符串
   * @param {string} prefix
   * @return {boolean}
   */
  public startsWith(prefix: string): boolean {
    let currentTrieNode: ITrieNode<string> = this.root;

    for (const str of prefix) {
      const index = str.charCodeAt(0) - this.charAtA;
      if (!currentTrieNode.children[index]) return false;
      currentTrieNode = currentTrieNode.children[index];
    }
    return true;
  }
}
