# DEMO

- todo 待加入单元测试 **test**
- 可以参考 antd

## Usage

```typescript
import LinkedList from './LinkedList;

const linked = new LinkedList();
linked.add(3);
linked.add(7);
linked.add(11);
linked.add(13);
linked.add(4);
linked.add(6);
console.log('Before inserting', linked, linked.size());
linked.insertByIndex(5, 1);
console.log('After inserting', linked, linked.size());
console.log('Head node is', linked.getHead());
console.log('Removing node at', linked.removeByIndex(5));
console.log('Now index 5 is', linked.getLinkedNodeByIndex(5));
console.log('End node is', linked.getEnd());
console.log('Stringified linkedlist', linked.toString());
console.log('IndexOf 4', linked.indexOf(4)); // -1
console.log('IndexOf 3', linked.indexOf(11)); // 3
linked.clear();
console.log('After clearing', linked, linked.size());
```
