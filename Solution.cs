
using System;
using System.Collections.Generic;
public class Solution
{
    struct Node
    {
        public int ID;
        public double probabilityFromNeighbour;
        public double probabilityFromStart;

        public Node(int ID, double probabilityFromNeighbour, double probabilityFromStart)
        {
            this.ID = ID;
            this.probabilityFromNeighbour = probabilityFromNeighbour;
            this.probabilityFromStart = probabilityFromStart;
        }
    }

    private int totalNodes;
    private List<Node>[] graph;

    public double MaxProbability(int totalNodes, int[][] edges, double[] successProbability, int start, int end)
    {
        this.totalNodes = totalNodes;
        createUndirectedGraph(edges, successProbability);

        return dijkstraSearchForMaxProbabilityPath(start, end);
    }

    private double dijkstraSearchForMaxProbabilityPath(int start, int end)
    {
        PriorityQueue<Node, double> maxHeap = new PriorityQueue<Node, double>(Comparer<double>.Create((first, second) => second.CompareTo(first)));
        maxHeap.Enqueue(new Node(start, 1, 1), 1);

        double[] maxProbabilityFromStart = new double[totalNodes];

        while (maxHeap.Count > 0)
        {
            Node current = maxHeap.Dequeue();
            foreach (Node next in graph[current.ID])
            {
                if (current.probabilityFromStart * next.probabilityFromNeighbour > maxProbabilityFromStart[next.ID])
                {
                    maxProbabilityFromStart[next.ID] = current.probabilityFromStart * next.probabilityFromNeighbour;
                    maxHeap.Enqueue(new Node(next.ID, next.probabilityFromNeighbour, maxProbabilityFromStart[next.ID]), maxProbabilityFromStart[next.ID]);
                }
            }
        }

        return maxProbabilityFromStart[end];
    }

    private void createUndirectedGraph(int[][] edges, double[] successProbability)
    {
        graph = new List<Node>[totalNodes];
        for (int i = 0; i < totalNodes; ++i)
        {
            graph[i] = new List<Node>();
        }

        for (int i = 0; i < edges.Length; ++i)
        {
            int from = edges[i][0];
            int to = edges[i][1];

            double probabilityFromNeighbour = successProbability[i];
            double probabilityFromStart = 1;

            graph[from].Add(new Node(to, probabilityFromNeighbour, probabilityFromStart));
            graph[to].Add(new Node(from, probabilityFromNeighbour, probabilityFromStart));
        }
    }
}
