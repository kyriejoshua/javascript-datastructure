# DEMO

## USAGE

### Heap

```typescript
import Heap from './Heap';

// 建立一个有着四个元素的堆，分别插入四个元素，再删除堆顶元素，观察其变化
const heap = new Heap(4);
heap.insert(4);
heap.insert(7);
heap.insert(2);
heap.insert(3);
console.log('heap before deleting ==>', heap); // heap before deleting ==> Heap { arr: [ <1 empty item>, 7, 4, 2, 3 ], max: 4, count: 4 }
heap.removeMax();
console.log('heap after deleting ==>', heap); // heap after deleting ==> Heap { arr: [ <1 empty item>, 4, 3, 2 ], max: 4, count: 3 }
```

### HeapSort

```typescript
import Heap from './Heap';

// about heapsort 关于堆排序
console.log(Heap.heapSort([9, 8, 7, 5, 1, 4, 6])); // [1, 4, 5, 6, 7, 8, 9]
console.log(Heap.heapSort([null, 5, 1, 4, 6])); // [ 1, 4, 5, 6 ]
```
