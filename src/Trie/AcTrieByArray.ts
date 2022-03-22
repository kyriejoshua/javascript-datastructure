/**
 * @description: AC 自动机中的节点
 */
/* AcNode is a class that represents a node in a trie */
class AcNode {
  public data: string;
  public children: AcNode[] = new Array(26).fill(null);
  public isEndingChar = false;
  public pattern = ''; // 当isEndingChar=true时，记录模式串长度
  // public length = -1; // 当isEndingChar=true时，记录模式串长度
  public AcNode: null;
  public fail: AcNode | null = null;
  constructor(data) {
    this.data = data;
  }
}

/**
 * @description: 使用数组实现的 AC 自动机
 * @return {*}
 */
export default class AcTrieByArray {
  public root: AcNode = new AcNode('/');

  /**
   * @description: 插入一个字符串
   * @param {string} text
   * @return {void}
   */
  public insert(text: string): void {
    let currentTrieNode: AcNode = this.root;
    // 遍历主串
    for (const str of text) {
      const index = str.charCodeAt(0) - 'a'.charCodeAt(0);
      if (!currentTrieNode.children[index]) {
        currentTrieNode.children[index] = new AcNode(str);
      }
      currentTrieNode = currentTrieNode.children[index];
    }
    currentTrieNode.isEndingChar = true;
    // 保存当前完整的字符串到最后一位中
    currentTrieNode.pattern = text;
  }

  /**
   * @description: 在 Trie 树中查找一个字符串
   * @param {string} pattern
   * @return {boolean}
   */
  public search(pattern: string): boolean {
    let currentTrieNode: AcNode = this.root;

    for (const str of pattern) {
      const index = str.charCodeAt(0) - 'a'.charCodeAt(0);
      if (!currentTrieNode.children[index]) return false;
      currentTrieNode = currentTrieNode.children[index];
    }

    return currentTrieNode.isEndingChar;
  }

  /**
   * @description: 创建 AcTrie
   * @param {string[]} patterns
   * @return {void}
   */
  public createAcTrie(patterns: string[]): void {
    for (let i = 0; i < patterns.length; i++) {
      this.insert(patterns[i]);
    }
  }

  /**
   * @description: 构建失败指针
   * @return {void}
   */
  public buildFailurePointer(): void {
    const queue = [];
    this.root.fail = null;
    queue.push(this.root);

    // !广度优先遍历，也是按层遍历
    while (queue.length) {
      const currentAcNode = queue.shift();
      // 假设只有 26 个字母
      for (let i = 0; i < 26; i++) {
        const pc: AcNode = currentAcNode.children[i];
        if (pc === null) continue;
        // 如果父节点就是根节点，那么所有子节点的失败指针都会指向根节点
        if (currentAcNode === this.root) {
          pc.fail = this.root;
        } else {
          // 如果父节点不是根节点，先取得当前节点的失败指针指向的节点
          let q = currentAcNode.fail;
          while (q !== null) {
            // 由失败指针指向的节点起始，从上往下找到当前字符对应的子节点
            const index = pc.data.charCodeAt(0) - 'a'.charCodeAt(0);
            const qc = q.children[index];
            if (qc !== null) {
              // 如果该节点存在字符，就设置为当前节点字符的失败指针指向的节点
              pc.fail = qc;
              break;
            }
            // 如果子节点不存在字符，就继续沿着失败指针指向的节点查找下去
            q = q.fail;
          }
          // 如果所有遍历完成后还是没有找到节点，那么就把失败指针指向根节点
          if (q === null) {
            pc.fail = this.root;
          }
        }
        // 在队列中加入下一层节点
        queue.push(pc);
      }
    }
  }

  /**
   * @description: 主串匹配多模式串，并取得模式串的位置和模式串内容
   * @param {string} word
   * @return {string[]}
   */
  match(word: string): string[] {
    const length = word.length;
    const uniqueWords = {}; // 用于标识唯一字符
    const matchedWords: string[] = []; // 返回所有查找到的模式串
    let p: AcNode = this.root;

    // 获取主串的所有字符进行匹配
    for (let i = 0; i < length; i++) {
      // 获取字符所对应的索引
      const index = word[i].charCodeAt(0) - 'a'.charCodeAt(0);
      // 如果没有查找到，就把当前节点更新为失败指针指向的节点
      while (p.children[index] === null && p !== this.root) {
        p = p.fail; // 更新到失败指针指向的节点
      }
      // 查找到之后继续往下走
      p = p.children[index];
      // 如果下一个字符没有匹配的，就要从根节点开始重新匹配
      if (!p) p = this.root;

      let temp: AcNode = p;
      // 如果根据当前字符有查找到对应的字符串
      while (temp !== this.root) {
        // 当匹配到最后一个字符的时候，获取长度计算出字符开始的位置并将其打印出来
        if (temp?.isEndingChar) {
          // !这里 temp 的字符和长度是在插入时保存的
          const pos = i - temp.pattern.length + 1;
          console.info(`匹配起始下标: ${pos}; 长度为: ${temp.pattern.length}; 对应字符为: ${temp.pattern}.`);
          if (!uniqueWords[temp.pattern]) {
            uniqueWords[temp.pattern] = temp.pattern;
            matchedWords.push(temp.pattern);
          }
        }
        // 重置指向因为可能存在有一个字符是两个字符串的结尾字符的情况
        temp = temp.fail;
      }
    }

    return matchedWords;
  }
}
