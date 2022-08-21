import LinkedList from '@/LinkedList';

/**
 * @description: 无向图
 * @return {*}
 */
export default class Graph {
  private v: number; // 顶点的个数
  private adj: LinkedList<number>[]; // 邻接表链表

  constructor(v: number) {
    this.v = v;
    this.adj = new Array(v);
    for (let i = 0; i < v; i++) {
      this.adj[i] = new LinkedList();
    }
  }

  /**
   * @description: 添加边
   * 无向图需要两个方向都添加
   * @param {number} s
   * @param {number} t
   * @return {void}
   */
  public addEdge(s: number, t: number): void {
    this.adj[s].add(t);
    this.adj[t].add(s);
  }

  /**
   * @description: 广度优先搜索
   * @param {number} s 起始顶点
   * @param {numebr} t 目标顶点
   * @return {void}
   */
  public bfs(s: number, t: number): void {
    if (s === t) return;

    // 存储是否已经访问过
    const visited: boolean[] = new Array(this.v);
    // 层序遍历，需要维护队列；链表形式的队列
    const queue = new LinkedList();
    // 记录搜索路径
    const prev: number[] = new Array(this.v).fill(-1);

    visited[s] = true;
    queue.add(s);

    while (queue.size()) {
      const w = queue.removeByIndex(0) as number;
      for (let i = 0; i < this.adj[w].size(); i++) {
        const q = this.adj[w].getElementByIndex(i) as number;
        if (q && q !== 0 && !visited[q]) {
          prev[q] = w;
          if (q === t) {
            return this.print(prev, s, t);
          }
          visited[q] = true;
          queue.add(q);
        }
      }
    }
  }

  /**
   * @description: 深度优先搜索
   * 回溯思想的应用
   * @param {number} s
   * @param {number} t
   * @return {void}
   */
  public dfs(s: number, t: number): void {
    const found = false;
    const visited = new Array(this.v);
    const prev: number[] = new Array(this.v).fill(-1);
    this.recuriveDfs(s, t, visited, prev, found);
    this.print(prev, s, t);
  }

  /**
   * @description: 打印路线
   * @param {T[]} prev
   * @param {number} s
   * @param {number} t
   * @return {void}
   */
  private print(prev: number[], s: number, t: number): void {
    // 递归打印s->t的路径
    if (prev[t] !== -1 && t !== s) {
      this.print(prev, s, prev[t]);
    }
    console.log(t + '->');
  }

  /**
   * @description: 递归遍历逻辑
   * @param {number} w 当前开始查找的起始顶点
   * @param {number} t 目标顶点
   * @param {boolean[]} visited 顶点访问状态
   * @param {number[]} prev 搜索路径记录
   * @param {boolean} found 标记是否已经找到
   * @return {void}
   */
  private recuriveDfs(w: number, t: number, visited: boolean[], prev: number[], found = false): void {
    // 如果已经找到终止的顶点
    if (found) return;

    // 标记为已访问过
    visited[w] = true;
    if (w === t) {
      found = true;
      return;
    }
    for (let i = 0; i < this.adj[w].size(); i++) {
      const q = this.adj[w].getElementByIndex(i) as number;
      if (!visited[q]) {
        prev[q] = w;
        this.recuriveDfs(q, t, visited, prev, found);
      }
    }
  }
}
