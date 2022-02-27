# DEMO

## Usage

```typescript
import Stack from './Stack;

const stack = new Stack(5);
console.log(stack); // []
console.log(stack.push(3)); // true
console.log(stack); // [3]
console.log(stack.addFirst(9));
console.log(stack); // [3, 9]
console.log(stack.push(7)); // true
console.log(stack.addFirst(4)); // true
console.log(stack); // [3, 9, 7, 4]
console.log(stack.pop()); // 4
console.log(stack); // [3, 9, 7]
console.log(stack.peek()); // 7
console.log(stack.removeFirst()); // 7
console.log(stack.peekFirst()); // 9
```
