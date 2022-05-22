# DEMO

## Usage

```typescript
import DuLinkedList from './DuLinkedList;

const duLinkedList = new DuLinkedList();
duLinkedList.add(3);
duLinkedList.add(7);
duLinkedList.add(11);
console.log('Before adding', duLinkedList, duLinkedList.size());
duLinkedList.add(13);
duLinkedList.add(4);
duLinkedList.add(6);
console.log('Before inserting', duLinkedList.toString(), duLinkedList.size()); //  3 ⇌ 7 ⇌ 11 ⇌ 13 ⇌ 4 ⇌ 6, 6
duLinkedList.insertByIndex(5, 1);
console.log('After inserting', duLinkedList.toString()); // 3 ⇌ 5 ⇌ 7 ⇌ 11 ⇌ 13 ⇌ 4 ⇌ 6
console.log('Head node is', duLinkedList.getHead()); // 3
console.log('Removing node at', duLinkedList.removeByIndex(5)); // 4
console.log('Now index 5 is', duLinkedList.getLinkedNodeByIndex(5)); // 5
console.log('End node is', duLinkedList.getEnd()); // 6
console.log('Stringified linkedlist', duLinkedList.toString()); // 3 ⇌ 5 ⇌ 11 ⇌ 13 ⇌ 4
console.log('IndexOf 4', duLinkedList.indexOf(4)); // -1
console.log('IndexOf 3', duLinkedList.indexOf(11)); // 3
duLinkedList.clear();
console.log('After clearing', duLinkedList, duLinkedList.size()); // { count: 0, head: null }, 0
```
