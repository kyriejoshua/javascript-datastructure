# DEMO

## Usage

```typescript
import Queue from './Queue;

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
```
