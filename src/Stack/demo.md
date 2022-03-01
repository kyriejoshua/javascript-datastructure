# DEMO

## Usage

```typescript
import Stack, { MyStack } from './Stack;

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

const myStack: MyStack<number> = new MyStack();
console.log(myStack.empty()); // true
myStack.push(1);
console.log(myStack); // MyStack { outQueue: [ 1 ], inQueue: [] }
myStack.push(3);
console.log(myStack); // MyStack { outQueue: [ 3, 1 ], inQueue: [] }
myStack.push(5);
myStack.push(7);
myStack.push(11);
console.log(myStack); // MyStack { outQueue: [ 11, 7, 5, 3, 1 ], inQueue: [] }
console.log(myStack.pop()); // 11
console.log(myStack); // MyStack { outQueue: [ 7, 5, 3, 1 ], inQueue: [] }
console.log(myStack.top()); // 7
console.log(myStack.pop()); // 7
console.log(myStack.pop()); // 5
console.log(myStack.empty()); // false
```
