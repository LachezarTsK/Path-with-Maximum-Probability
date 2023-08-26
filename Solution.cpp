
#include <queue>
#include <vector>
using namespace std;

class Solution {

    struct Node {
        int ID;
        double probabilityFromNeighbour;
        double probabilityFromStart;

        Node(int ID, double probabilityFromNeighbour, double probabilityFromStart) :
        ID{ID},
        probabilityFromNeighbour{ probabilityFromNeighbour},
        probabilityFromStart{ probabilityFromStart}{}
    };

    struct Comparator {
        bool operator()(const Node& first, const Node& second) const {
            return second.probabilityFromStart > first.probabilityFromStart;
        }
    };

    int totalNodes;
    vector<vector<Node>> graph;

public:
    double maxProbability(int totalNodes, const vector<vector<int>>&edges, const vector<double>& successProbability, int start, int end) {
        this->totalNodes = totalNodes;
        createUndirectedGraph(edges, successProbability);

        return dijkstraSearchForMaxProbabilityPath(start, end);
    }

private:
    double dijkstraSearchForMaxProbabilityPath(int start, int end) const {
        priority_queue<Node, vector<Node>, Comparator> maxHeap;
        maxHeap.emplace(start, 1, 1);

        vector<double> maxProbabilityFromStart(totalNodes);

        while (!maxHeap.empty()) {
            Node current = maxHeap.top();
            maxHeap.pop();
            for (const auto& next : graph[current.ID]) {
                if (current.probabilityFromStart * next.probabilityFromNeighbour > maxProbabilityFromStart[next.ID]) {
                    maxProbabilityFromStart[next.ID] = current.probabilityFromStart * next.probabilityFromNeighbour;
                    maxHeap.emplace(next.ID, next.probabilityFromNeighbour, maxProbabilityFromStart[next.ID]);
                }
            }
        }

        return maxProbabilityFromStart[end];
    }

    void createUndirectedGraph(const vector<vector<int>>& edges, const vector<double>& successProbability) {
        graph.resize(totalNodes);

        for (int i = 0; i < edges.size(); ++i) {
            int from = edges[i][0];
            int to = edges[i][1];

            double probabilityFromNeighbour = successProbability[i];
            double probabilityFromStart = 1;

            graph[from].emplace_back(to, probabilityFromNeighbour, probabilityFromStart);
            graph[to].emplace_back(from, probabilityFromNeighbour, probabilityFromStart);
        }
    }
};
