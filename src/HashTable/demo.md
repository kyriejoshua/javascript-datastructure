# DEMO

## Usage

```typescript
import BasicHashTable from './HashTable;

const basicHashTable = new BasicHashTable(3);
console.log(basicHashTable);
// 正常插入
basicHashTable.put('001', 1);
console.log(basicHashTable);
// 继续插入
basicHashTable.put('04', 41);
console.log(basicHashTable);
// 有冲突的插入
basicHashTable.put('10', 10);
console.log(basicHashTable);
// 读取
console.log('current 10 val', basicHashTable.get('10'));
console.log('current 04 val', basicHashTable.get('04'));
console.log(basicHashTable);
// 散列表满的状态下插入，会抛出异常
basicHashTable.put('03', 30);
console.log(basicHashTable);
```
