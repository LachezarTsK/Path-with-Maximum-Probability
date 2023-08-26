
/**
 * @param {number} totalNodes
 * @param {number[][]} edges
 * @param {number[]} successProbability
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
var maxProbability = function (totalNodes, edges, successProbability, start, end) {
    this.totalNodes = totalNodes;
    this.graph = Array.from(new Array(totalNodes), () => new Array());
    createUndirectedGraph(edges, successProbability);

    return dijkstraSearchForMaxProbabilityPath(start, end);
};

/**
 * @param {number} ID
 * @param {number} probabilityFromNeighbour
 * @param {number} probabilityFromStart
 */
function Node(ID, probabilityFromNeighbour, probabilityFromStart) {
    this.ID = ID;
    this.probabilityFromNeighbour = probabilityFromNeighbour;
    this.probabilityFromStart = probabilityFromStart;
}

/**
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
function dijkstraSearchForMaxProbabilityPath(start, end) {

    //const {MaxPriorityQueue} = require('@datastructures-js/priority-queue');
    //MaxPriorityQueue<Node>
    const maxHeap = new MaxPriorityQueue({compare: (first, second) => comparator(first, second)});
    maxHeap.enqueue(new Node(start, 1, 1));

    const maxProbabilityFromStart = new Array(this.totalNodes).fill(0);

    while (!maxHeap.isEmpty()) {
        const current = maxHeap.dequeue();
        for (let next of this.graph[current.ID]) {
            if (current.probabilityFromStart * next.probabilityFromNeighbour > maxProbabilityFromStart[next.ID]) {
                maxProbabilityFromStart[next.ID] = current.probabilityFromStart * next.probabilityFromNeighbour;
                maxHeap.enqueue(new Node(next.ID, next.probabilityFromNeighbour, maxProbabilityFromStart[next.ID]));
            }
        }
    }

    return maxProbabilityFromStart[end];
}

/**
 * @param {number[][]} edges
 * @param {number[]} successProbability
 * @return {void}
 */
function createUndirectedGraph(edges, successProbability) {

    for (let i = 0; i < edges.length; ++i) {
        let from = edges[i][0];
        let to = edges[i][1];

        let probabilityFromNeighbour = successProbability[i];
        let probabilityFromStart = 1;

        this.graph[from].push(new Node(to, probabilityFromNeighbour, probabilityFromStart));
        this.graph[to].push(new Node(from, probabilityFromNeighbour, probabilityFromStart));
    }
}

/**
 * @param {number} first
 * @param {number} second
 * @return {number}
 */
function comparator(first, second) {
    if (second.probabilityFromStart === first.probabilityFromStart) {
        return 0;
    }
    return second.probabilityFromStart < first.probabilityFromStart ? -1 : 1;
}
