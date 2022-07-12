# DEMO

## Usage

### Tree

```typescript
import BinaryTree from './Tree';

const binaryTree = new BinaryTree();
binaryTree.left = new BinaryTree(1);
binaryTree.right = new BinaryTree(2);

console.log(binaryTree);
console.log('=== preOrderTraversal ===');
preOrderTraversal(binaryTree);
console.log('=== inOrderTraversal ===');
inOrderTraversal(binaryTree);
console.log('=== postOrderTraversal ===');
postOrderTraversal(binaryTree);
```

#### Output

```shell
TreeNode {
  value: 0,
  left: TreeNode { value: 1, left: null, right: null },
  right: TreeNode { value: 2, left: null, right: null }
}
=== preOrderTraversal ===
0
1
2
=== inOrderTraversal ===
0
1
2
=== postOrderTraversal ===
1
2
0
```
