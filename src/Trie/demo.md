# DEMO

## Usage

### About Trie

```typescript
import Trie, { TrieByArray } from './Trie;

const trieByArray = new TrieByArray();
console.log(trieByArray.insert('apple')); // void
console.log(trieByArray.search('apple')); // 返回 true
console.log(trieByArray.search('app')); // 返回 false
console.log(trieByArray.startsWith('app')); // 返回 true
console.log(trieByArray.insert('app')); // void
console.log(trieByArray.search('app')); // 返回 true

const trie = new Trie();
console.log(trie.insert('apple')); // void
console.log(trie.search('apple')); // 返回 true
console.log(trie.search('app')); // 返回 false
console.log(trie.startsWith('app')); // 返回 true
console.log(trie.insert('app')); // void
console.log(trie.search('app')); // 返回 true
```

### About AcTrie

```typescript
import { AcTrie, AcTrieByArray } from './Trie;

const acTrieByArray = new AcTrieByArray();
acTrieByArray.createAcTrie(['she', 'shr', 'say', 'he', 'her', 'has']);
acTrieByArray.buildFailurePointer();
console.log(acTrieByArray.match('one day she says her has eaten many shrimps'));
// 输出内容如下
// 匹配起始下标: 8; 长度为: 3; 对应字符为: she.
// 匹配起始下标: 9; 长度为: 2; 对应字符为: he.
// 匹配起始下标: 12; 长度为: 3; 对应字符为: say.
// 匹配起始下标: 16; 长度为: 2; 对应字符为: he.
// 匹配起始下标: 16; 长度为: 3; 对应字符为: her.
// 匹配起始下标: 20; 长度为: 3; 对应字符为: has.
// 匹配起始下标: 35; 长度为: 3; 对应字符为: shr.
// [ 'she', 'he', 'say', 'her', 'has', 'shr' ]

const acTrie = new AcTrie();
acTrie.createAcTrie(['she', 'shr', 'say', 'he', 'her', 'has']);
acTrie.buildFailurePointer();
console.log(acTrie.match('one day she says her has eaten many shrimps'));
// 输出内容如下
// 匹配起始下标: 8; 长度为: 3; 对应字符为: she.
// 匹配起始下标: 9; 长度为: 2; 对应字符为: he.
// 匹配起始下标: 12; 长度为: 3; 对应字符为: say.
// 匹配起始下标: 16; 长度为: 2; 对应字符为: he.
// 匹配起始下标: 16; 长度为: 3; 对应字符为: her.
// 匹配起始下标: 20; 长度为: 3; 对应字符为: has.
// 匹配起始下标: 35; 长度为: 3; 对应字符为: shr.
// [ 'she', 'he', 'say', 'her', 'has', 'shr' ]
```
