# DEMO

## Usage

```typescript
import DuLinkedList from './DuLinkedList;

const duLinkedList = new DuLinkedList();
duLinkedList.append(3);
duLinkedList.append(7);
duLinkedList.append(11);
console.log('Before adding', duLinkedList, duLinkedList.size());
duLinkedList.append(13);
duLinkedList.append(4);
duLinkedList.append(6);
console.log('Before inserting', duLinkedList.toString(), duLinkedList.size()); //  3 ⇌ 7 ⇌ 11 ⇌ 13 ⇌ 4 ⇌ 6, 6
duLinkedList.insertByIndex(5, 1);
console.log('After inserting', duLinkedList.toString()); // 3 ⇌ 5 ⇌ 7 ⇌ 11 ⇌ 13 ⇌ 4 ⇌ 6
console.log('Head node is', duLinkedList.getHead()); // 3
console.log('Removing node at', duLinkedList.removeByIndex(5)); // Removing node at 4
console.log('Now index 5 is', duLinkedList.getLinkedNodeByIndex(5)); // 5
console.log('Tail node is', duLinkedList.getTail()); // 6
console.log('Stringified linkedlist', duLinkedList.toString()); // 3 ⇌ 5 ⇌ 7 ⇌ 11 ⇌ 13 ⇌ 6
console.log('IndexOf 4', duLinkedList.indexOf(4)); // IndexOf 4 -1
console.log('IndexOf 3', duLinkedList.indexOf(11)); // IndexOf 3 3
console.log('Append Node 99', duLinkedList.append(99), duLinkedList.toString()); // Append Node 99 7 3 ⇌ 5 ⇌ 7 ⇌ 11 ⇌ 13 ⇌ 6 ⇌ 99
console.log('Remove Node 99', duLinkedList.removeTail(), duLinkedList.toString()); // Remove Node 99 3 ⇌ 5 ⇌ 7 ⇌ 11 ⇌ 13 ⇌ 6
console.log('Remove Node 7', duLinkedList.removeElement(7), duLinkedList.toString()); // Remove Node 7 DuLinkedNode { element: 7, next: null, prev: null } 3 ⇌ 5 ⇌ 11 ⇌ 13 ⇌ 6
duLinkedList.clear();
console.log('After clearing', duLinkedList, duLinkedList.size()); // After clearing DuLinkedList { count: 0, head: null, tail: null } 0
```
