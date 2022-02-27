export interface IHashObject {
  key: string | number;
  value: unknown;
  deleted?: boolean; // 保存被删除索引或数组的属性的统计
}

/**
 * @description: 最基础的散列表，不包含装载因子
 */
export default class BasicHashTable<T extends IHashObject> {
  private basicHashTable: T[] = [];
  private size = 9533; // 10000 以内的最大质数
  private hash: (key: string) => string | number = this.defaultHash;
  // private deletedKeys: (number | string)[];

  /**
   * @description: 构造函数
   * @param {number} size 设置散列表大小，默认是一万
   * @param {function} hash 散列函数
   */
  constructor(size?: number, hash?) {
    if (!this.isSizeLegal(size)) return;
    this.size = size || this.size;
    this.hash = hash || this.defaultHash;
  }

  /**
   * @description: 校验传入的散列表大小是否合法
   * size 大小判断
   * 整数判断
   * @param {number} size
   * @return {boolean}
   */
  private isSizeLegal(size?: number): boolean {
    const errorMessage = 'Please set a logical size for hashTable.';
    if (size === 0) {
      throw new Error(errorMessage);
    }
    if (size) {
      if (size > Number.MAX_SAFE_INTEGER || size < 0) throw new Error(errorMessage);
      if (Math.floor(size) !== size) throw new Error(errorMessage);
    }
    return true;
  }

  /**
   * @description: 默认散列函数的冲突解决方式：线性探测
   * @param {number} numberedHashKey
   * @return {number}
   */
  private getDefaultNextHashKey(numberedHashKey: number): number {
    console.warn('The Hash key is used! Starting finding the next key.');
    // 解决散列冲突
    let findedNextUndefinedHashKey = numberedHashKey;
    while (this.basicHashTable[findedNextUndefinedHashKey] !== undefined) {
      findedNextUndefinedHashKey++;
      findedNextUndefinedHashKey %= this.size;
    }
    return findedNextUndefinedHashKey;
  }

  /**
   * @description: 默认取最后两位作为索引
   * @param {string} key
   * @return {number}
   */
  private defaultHash(key: string): number {
    let hashKey = key;
    if (typeof hashKey !== 'string') {
      hashKey = String(hashKey);
    }

    // let numberedHashKey = Number(hashKey.slice(hashKey.length - 2));
    let numberedHashKey = 0;
    for (const str of hashKey) {
      // chartCodeAt 支持传入索引作为参数，如果不传，那么默认取第一个，也就是它的值为 0
      numberedHashKey += str.charCodeAt(0);
    }
    // 这里取模的方式在 size 较小的时候就会比较容易重复，容易引发散列冲突；
    // 而散列函数的核心就是不同的值不能输出相同的，但通常不会使用 size 特别小的散列表
    numberedHashKey %= this.size;

    return numberedHashKey;
  }

  /**
   * @description: 获取当前散列表的有效长度
   * @param {T[]} basicHashTable
   * @return {number}
   */
  private getHashMapLength(basicHashTable: T[]): number {
    return basicHashTable.filter(Boolean).length;
  }

  /**
   * @description: 获取对应的散列表的存储的内容
   * @param {string} key
   * @return {T}
   */
  private getHashByKey(key: string): T {
    const hashKey = this.hash(key);
    if (this.basicHashTable[hashKey]?.key === hashKey) {
      if (this.basicHashTable[hashKey]?.deleted) throw new Error('This value has been deleted!');
      return this.basicHashTable[hashKey];
    }
    const numberedHashKey = Number(hashKey);
    let currentHashKey = numberedHashKey;
    while (this.basicHashTable[currentHashKey]?.key !== key) {
      currentHashKey++;
      currentHashKey %= this.size;
    }
    if (this.basicHashTable[hashKey]?.deleted) throw new Error('This value has been deleted!');
    return this.basicHashTable[currentHashKey];
  }

  /**
   * @description: 支持按照索引插入，也支持属性插入，暂不支持混合插入，校验会有问题
   * 如果不传参数，默认按照 undefined 字符串的解析
   * @param {string} key
   * @param {any} val
   * @return {*}
   */
  public put = (key: string, val: unknown): T[] => {
    // 如果当前散列表已满，可以是数组内元素撑满，也可以是属性个数撑满
    const currentHashMapLength = this.getHashMapLength(this.basicHashTable);
    if (currentHashMapLength >= this.size || Object.keys(this.basicHashTable).length >= this.size) {
      throw new Error('This HashMap is totally full!');
    }
    // 如果当前索引没有值，直接插入，允许当作属性的情况
    const hashKey = this.hash(key);
    console.log('current hash key ===>', hashKey);
    if (this.basicHashTable[hashKey] === undefined) {
      // 注意这里存储的 key 是原始值，否则取值时无法一一对应
      this.basicHashTable[hashKey] = {
        key,
        value: val,
      };
      return this.basicHashTable;
    }
    const numberedHashKey = Number(hashKey);
    // 散列冲突的场景，开放寻址法的线性查找
    if (Number.isNaN(numberedHashKey)) {
      throw new Error('The Hash key must be converted to numbers');
    }

    const findedNextUndefinedHashKey = this.getDefaultNextHashKey(numberedHashKey);
    this.basicHashTable[findedNextUndefinedHashKey] = {
      key,
      value: val,
    } as T;

    return this.basicHashTable;
  };

  /**
   * @description: 取值
   * 默认按照 hashKey 取，取不到时向后依次遍历
   * @param {string} key
   * @return {unknown}
   */
  public get = (key: string): unknown => {
    return this.getHashByKey(key)?.value;
  };

  /**
   * @description: 删除，给对应的位置加一个标来标识
   * @param {string} key
   * @return {boolean}
   */
  public delete = (key: string): boolean => {
    const currentHash: T = this.getHashByKey(key);
    if (currentHash) {
      currentHash.deleted = true;
      return true;
    }
    return false;
  };

  /**
   * @description: 清空所有值
   * @return {void}
   */
  public clear = (): void => {
    this.basicHashTable = [];
  };
}
