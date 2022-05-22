# DEMO

## Usage

### About LRUCache

```typescript
import LRUCacheByArray from './LRUCache;

const lru = new LRUCacheByArray(5);
console.log(lru.put(1, 1)); // undefined
console.log(lru.get(2)); // -1
console.log(lru.get(1)); // 1
console.log(lru.put(3, 3)); // undefined
console.log(lru.put(4, 4)); // undefined
console.log(lru.get(3)); // 3
```
