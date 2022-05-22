/*
 * @Author: kyriejoshua
 * @Description: TODO
 * @Date: 2022-05-22 20:11:14
 * @LastEditors: kyriejoshua
 * @LastEditTime: 2022-05-22 20:31:34
 */
export interface ICacheItem {
  key: number;
  value: number;
}

/**
 * LRU 缓存淘汰算法-数组实现
 */
class LRUCacheByArray {
  private cacheList: ICacheItem[]; // 缓存数组
  private maxCacheLength: number; // 缓存容量

  constructor(capacity: number) {
    this.cacheList = [];
    this.maxCacheLength = capacity;
  }

  /**
   * @description: 缓存的读取
   * @param {number} key
   * @return {number}
   */
  get(key: number): number {
    // 查找索引是否存在
    const cachedIndex = this.cacheList.findIndex((item: ICacheItem): boolean => item.key === key);
    if (cachedIndex === -1) {
      return cachedIndex;
    }
    // 修改原缓存数组
    const [cached] = this.cacheList.splice(cachedIndex, 1);
    // 把最近读取的放在第一位
    this.cacheList.unshift(cached);
    return cached.value;
  }

  /**
   * @description: 缓存的修改
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key: number, value: number): void {
    // 首先查找是否原先已缓存
    const cachedIndex = this.cacheList.findIndex((item: ICacheItem): boolean => item.key === key);
    // 如果已缓存，就更新值
    if (cachedIndex !== -1) {
      // 删除原先的缓存内容
      this.cacheList.splice(cachedIndex, 1);
      // 进行更新，放到最近的位置
      this.cacheList.unshift({ key, value });
      return;
    } else {
      this.cacheList.unshift({ key, value });
      // 如果超出了，就移除最早缓存的
      this.cacheList.length > this.maxCacheLength && this.cacheList.pop();
      return;
    }
  }
}

export default LRUCacheByArray;

const lru = new LRUCacheByArray(5);
console.log(lru.put(1, 1)); // null
console.log(lru.get(2)); // null
console.log(lru.get(1)); // 1
console.log(lru.put(3, 3)); // null
console.log(lru.put(4, 4)); // null
console.log(lru.get(3)); // 3
