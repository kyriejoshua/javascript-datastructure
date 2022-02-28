# DEMO

## Usage

```typescript
import Queue, { MyQueue } from './Queue;

const queue = new Queue();
console.log(queue.add(2)); // undefined
console.log(queue.add(4)); // undefined
console.log(queue); // [2, 4]
console.log(queue.offer(6)); // true
console.log(queue.offer(8)); // true
console.log(queue); // [2, 4, 6, 8]
console.log('Size of current queue is ', queue.size()); // 4
console.log(queue.remove()); // undefined
console.log(queue); // [4, 6, 8]
console.log(queue.poll()); // 4
console.log(queue); // [6, 8]
console.log(queue.peek()); // 6
console.log(queue); // [6, 8]
console.log(queue.element()); // 6
console.log(queue); // 6, 8

const myQueue = new MyQueue();
myQueue.push(1);
myQueue.push(3);
myQueue.push(5);
console.log(myQueue.push(7)); // undefined
console.log(myQueue); // MyQueue { inStack: [ 1, 3, 5, 7 ], outStack: [] }
console.log(myQueue.poll()); // 1
console.log(myQueue.poll()); // 3
console.log(myQueue.peek()); // 5
console.log(myQueue.peek()); // 5
```
