# DEMO

## Usage

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
