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
   * @param {number} s
   * @param {numebr} t
   * @return {void}
   */
  public bfs(s: number, t: number): void {
    if (s === t) return;
    const visited: boolean[] = new Array(this.v);
    const queue = new LinkedList();
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
   * @param {number} w
   * @param {number} t
   * @param {boolean[]} visited
   * @param {number[]} prev
   * @param {boolean} found
   * @return {void}
   */
  private recuriveDfs(w: number, t: number, visited: boolean[], prev: number[], found = false): void {
    if (found) return;
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

const graph = new Graph(8);
graph.addEdge(0, 1);
graph.addEdge(0, 3);
graph.addEdge(1, 4);
graph.addEdge(1, 2);
graph.addEdge(3, 4);
graph.addEdge(2, 5);
graph.addEdge(4, 5);
graph.addEdge(4, 6);
graph.addEdge(6, 7);
graph.addEdge(5, 7);
console.log(graph);
console.log(graph.bfs(0, 7)); // 0 -> 1 -> 4 -> 5 -> 7
console.log(graph.dfs(0, 7)); // 0 -> 1 -> 4 -> 5 -> 7
