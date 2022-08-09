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
  private swap(arr: number[], i: number, j: number): void {
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }

  /**
   * @description: 堆化
   * 按照大顶堆的方式堆化
   * @param {number[]} arr
   * @param {number} heapSize
   * @param {number} i
   * @return {void}
   */
  private heapify(arr: number[], heapSize: number, i: number): void {
    let maxIndex = i;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      // 保存较大值的索引，分别与左右子节点比较
      if (2 * i <= heapSize && arr[maxIndex] < arr[2 * i]) maxIndex = 2 * i;
      if (2 * i + 1 <= heapSize && arr[maxIndex] < arr[2 * i + 1]) maxIndex = 2 * i + 1;
      if (maxIndex === i) break;
      this.swap(arr, i, maxIndex);
      i = maxIndex;
    }
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
      this.swap(this.arr, i, Math.floor(i / 2));
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
    this.heapify(this.arr, this.count, 1);
    return maxNum;
  }
}
