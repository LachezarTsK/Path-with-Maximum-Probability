
import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

public class Solution {

    private record Node(int ID, double probabilityFromNeighbour, double probabilityFromStart) {}

    private int totalNodes;
    private List<Node>[] graph;

    public double maxProbability(int totalNodes, int[][] edges, double[] successProbability, int start, int end) {
        this.totalNodes = totalNodes;
        createUndirectedGraph(edges, successProbability);

        return dijkstraSearchForMaxProbabilityPath(start, end);
    }

    private double dijkstraSearchForMaxProbabilityPath(int start, int end) {
        PriorityQueue<Node> maxHeap = new PriorityQueue<>((first, second) -> comparator(first, second));
        maxHeap.add(new Node(start, 1, 1));

        double[] maxProbabilityFromStart = new double[totalNodes];

        while (!maxHeap.isEmpty()) {
            Node current = maxHeap.poll();
            for (Node next : graph[current.ID]) {
                if (current.probabilityFromStart * next.probabilityFromNeighbour > maxProbabilityFromStart[next.ID]) {
                    maxProbabilityFromStart[next.ID] = current.probabilityFromStart * next.probabilityFromNeighbour;
                    maxHeap.add(new Node(next.ID, next.probabilityFromNeighbour, maxProbabilityFromStart[next.ID]));
                }
            }
        }

        return maxProbabilityFromStart[end];
    }

    private void createUndirectedGraph(int[][] edges, double[] successProbability) {
        graph = new List[totalNodes];
        for (int i = 0; i < totalNodes; ++i) {
            graph[i] = new ArrayList<>();
        }

        for (int i = 0; i < edges.length; ++i) {
            int from = edges[i][0];
            int to = edges[i][1];

            double probabilityFromNeighbour = successProbability[i];
            double probabilityFromStart = 1;

            graph[from].add(new Node(to, probabilityFromNeighbour, probabilityFromStart));
            graph[to].add(new Node(from, probabilityFromNeighbour, probabilityFromStart));
        }
    }

    private static int comparator(Node first, Node second) {
        if (second.probabilityFromStart == first.probabilityFromStart) {
            return 0;
        }
        return second.probabilityFromStart < first.probabilityFromStart ? -1 : 1;
    }
}
