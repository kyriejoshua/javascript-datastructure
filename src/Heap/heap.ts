/**
 * @description: 注意这里的堆的起始位置是从索引 1 开始的
 * @return {Heap}
 */
export default class Heap {
  private arr: number[]; // 使用数组表示堆
  private max: number; // 堆可以存储的最大数量
  private count: number; // 堆中已经存在的数据数量

  /**
   * @description: 初始化堆
   * @param {number} capacity
   * @return {void}
   */
  constructor(capacity: number) {
    this.arr = new Array(capacity + 1);
    this.max = capacity;
    this.count = 0;
  }

  /**
   * @description: 交换数组中对应索引的位置
   * @param {number[]} arr
   * @param {number} i
   * @param {number} j
   * @return {void}
   */
  static swap(arr: number[], i: number, j: number): void {
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }

  /**
   * @description: 自下而上的堆化
   * 以生成小顶堆为例
   * @param {number[]} arr
   * @param {number} i
   * @return {number[]}
   */
  static heapifyFromDown(arr: number[], i: number): number[] {
    let index = Math.floor(i / 2);
    while (index > 0 && arr[index] > arr[i]) {
      Heap.swap(arr, i, index);
      index = Math.floor(index / 2);
    }
    return arr;
  }

  /**
   * @description: 自上而下的堆化
   * 以生成小顶堆为例
   * @param {number[]} arr
   * @param {number} heapSize
   * @param {number} i
   * @return {void}
   */
  static heapifyFromUp(arr: number[], heapSize: number, i: number): void {
    let minIndex = i;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const leftChildNode = 2 * i;
      const rightChildNode = 2 * i + 1;

      if (leftChildNode <= heapSize && arr[minIndex] > arr[leftChildNode]) minIndex = leftChildNode;
      if (rightChildNode <= heapSize && arr[minIndex] > arr[rightChildNode]) minIndex = rightChildNode;

      if (minIndex === i) break;
      // 保存较小值的索引，分别与左右子节点比较
      Heap.swap(arr, i, minIndex);
      // 更新索引值，继续遍历
      i = minIndex;
    }
  }

  /**
   * @description: 堆化
   * 按照大顶堆的方式自上而下堆化
   * @param {number[]} arr
   * @param {number} heapSize
   * @param {number} i
   * @return {void}
   */
  static heapify(arr: number[], heapSize: number, i: number): void {
    let maxIndex = i;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      // 保存较大值的索引，分别与左右子节点比较
      const leftChildNode = 2 * i;
      const rightChildNode = 2 * i + 1;

      if (leftChildNode <= heapSize && arr[maxIndex] < arr[leftChildNode]) maxIndex = leftChildNode;
      if (rightChildNode <= heapSize && arr[maxIndex] < arr[rightChildNode]) maxIndex = rightChildNode;

      if (maxIndex === i) break;
      Heap.swap(arr, i, maxIndex);
      i = maxIndex;
    }
  }

  /**
   * @description: 从后往前构建大顶堆
   * @param {number[]} arr
   * @param {number} heapSize
   * @return {number[]}
   */
  static buildMaxHeap(arr: number[], heapSize: number): number[] {
    for (let i = Math.floor(heapSize / 2); i > 0; i--) {
      Heap.heapify(arr, heapSize, i);
    }

    return arr;
  }

  /**
   * @description: 从前往后构建小顶堆
   * @param {number[]} arr
   * @param {number} i
   * @return {number[]}
   */
  static buildMinHeap(arr: number[], i: number): number[] {
    while (i < arr.length - 1) {
      i++;
      Heap.heapifyFromDown(arr, i);
    }
    return arr;
  }

  /**
   * @description: 堆排序
   * 构建大顶堆
   * 交换最大值的元素到末位
   * 堆化直至数组有序
   * 这里默认索引从 1 开始，也可以改为从 0 开始，相应的，堆化的地方也要处理成 0
   * @param {number[]} arr
   * @return {boolean} sortInplace 默认是原地排序
   * @return {number[]}
   */
  static heapSort(arr: number[], sortInplace = true): number[] {
    const [firstElement] = arr;
    const res: number[] = sortInplace ? arr : [...arr];
    // 手动插入第一个元素
    if (firstElement !== null && firstElement !== undefined) {
      res.unshift(null);
    }

    // 数组的最后的元素的索引
    const lastHeapIndex = res.length - 1;

    // 构建大顶堆
    Heap.buildMaxHeap(res, lastHeapIndex);

    // !从后往前比较，把当前遍历的节点值交换到根节点,把根节点（也就是最大值）放到当前树（子树）的末尾
    for (let i = lastHeapIndex; i > 1; i--) {
      // 交换最大值到末尾
      Heap.swap(res, 1, i);
      // !减小堆的长度，相当于剔除已经排好序的最大值，开始堆化当前最大值之外的最大值，索引就是 i - 1
      // 对根节点进行自上而下的堆化，重新排出最大值到根节点
      Heap.heapify(res, i - 1, 1);
      // 其实也可以用 heapSize， 可能会比较好理解，效果是等价的
      // lastHeapIndex--;
      // Heap.heapify(res, lastHeapIndex, 1);
    }

    return res.slice(1);
  }

  /**
   * @description: 插入一个元素
   * 自下往上堆化
   * @param {number} data
   * @return {boolean}
   */
  public insert(data: number): boolean {
    if (this.count > this.max) return false;
    this.count++;
    this.arr[this.count] = data;
    let i = this.count;

    // 索引从后往前
    while (Math.floor(i / 2) > 0 && this.arr[i] > this.arr[Math.floor(i / 2)]) {
      // 交换位置
      Heap.swap(this.arr, i, Math.floor(i / 2));
      i /= 2;
      i = Math.floor(i);
    }

    return true;
  }

  /**
   * @description: 删除堆顶元素
   * 交换堆顶元素到末尾，再从上往下进行堆化
   * @return {number}
   */
  public removeMax(): number {
    // 当前堆中没有数据
    if (this.count === 0) return -1;
    // 把末尾元素交换到堆顶点
    this.arr[1] = this.arr[this.count];
    const maxNum = this.arr.pop(); // 利用 js 的方法直接剔除最后一个元素
    // 剔除最后一个节点
    this.count--;
    // 自上往下堆化
    Heap.heapify(this.arr, this.count, 1);
    return maxNum;
  }
}
