Sure, let's start by explaining K-Means and Hierarchical Clustering, and then I'll provide Python code examples for both.

**K-Means Clustering:**

K-Means clustering is a partitioning-based clustering algorithm that aims to partition data into K clusters, where each data point belongs to the cluster with the nearest mean (centroid). Here's how it works:

1. **Initialization:** Randomly initialize K centroids.

2. **Assignment:** Assign each data point to the nearest centroid, forming K clusters.

3. **Update Centroids:** Recalculate the centroids of each cluster as the mean of all data points assigned to that cluster.

4. **Repeat:** Iterate steps 2 and 3 until convergence, i.e., when the centroids no longer change significantly or a predefined number of iterations is reached.

**Hierarchical Clustering:**

Hierarchical clustering is a method of cluster analysis that builds a hierarchy of clusters. It does not require specifying the number of clusters beforehand. Here's how it works:

1. **Initialization:** Start with each data point as a singleton cluster.

2. **Merge:** Iteratively merge the two closest clusters until only one cluster remains, forming a hierarchy or dendrogram.

3. **Dendrogram Cutting:** Cut the dendrogram at a certain height to determine the number of clusters.

4. **Cluster Formation:** Assign each data point to a cluster based on the cutting point.

Here are Python code examples for both K-Means and Hierarchical Clustering:

**K-Means Clustering Example:**

```python
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Generate sample data
X, _ = make_blobs(n_samples=300, centers=4, cluster_std=0.60, random_state=0)

# Perform K-Means clustering
kmeans = KMeans(n_clusters=4)
kmeans.fit(X)
y_kmeans = kmeans.predict(X)

# Visualize the clusters
plt.scatter(X[:, 0], X[:, 1], c=y_kmeans, s=50, cmap='viridis')

centers = kmeans.cluster_centers_
plt.scatter(centers[:, 0], centers[:, 1], c='red', s=200, alpha=0.75)
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.title('K-Means Clustering')
plt.show()
```

**Hierarchical Clustering Example:**

```python
from scipy.cluster.hierarchy import dendrogram, linkage
import matplotlib.pyplot as plt

# Generate sample data
X = [[i] for i in [2, 8, 0, 4, 1, 9, 9, 0]]

# Perform Hierarchical Clustering
linked = linkage(X, 'single')

# Plot dendrogram
plt.figure(figsize=(10, 5))
dendrogram(linked, orientation='top', distance_sort='descending', show_leaf_counts=True)
plt.title('Hierarchical Clustering Dendrogram')
plt.xlabel('Sample Index')
plt.ylabel('Distance')
plt.show()
```
