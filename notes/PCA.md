Principal Component Analysis (PCA) is a dimensionality reduction technique commonly used in data analysis and machine learning. It works by transforming the original dataset into a new coordinate system, where the axes are the principal components (PCs), which are orthogonal to each other and capture the maximum variance in the data.

1. **Standardization:** The first step is often to standardize the data by subtracting the mean and dividing by the standard deviation of each feature. This ensures that each feature has a mean of 0 and a standard deviation of 1.

2. **Covariance Matrix:** Next, PCA calculates the covariance matrix of the standardized data. The covariance matrix describes the relationships between all pairs of features in the dataset.

3. **Eigenvalue Decomposition:** PCA then performs eigenvalue decomposition on the covariance matrix to find the eigenvectors and eigenvalues. Eigenvectors represent the directions of the new feature space (principal components), and eigenvalues represent the magnitude of variance along these directions.

4. **Selecting Principal Components:** PCA ranks the eigenvectors based on their corresponding eigenvalues. The eigenvector with the highest eigenvalue is the first principal component (PC1), the second highest eigenvalue corresponds to PC2, and so on.

5. **Projection:** Finally, PCA projects the original data onto the new feature space defined by the selected principal components. This results in a lower-dimensional representation of the data, where the new variables (principal components) are uncorrelated and capture the maximum variance.

```python
from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# Load the Iris dataset
iris = load_iris()
X = iris.data
y = iris.target

# Standardize the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Perform PCA
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

# Plot the PCA-transformed data
plt.figure(figsize=(8, 6))
for i in range(len(iris.target_names)):
    plt.scatter(X_pca[y == i, 0], X_pca[y == i, 1], label=iris.target_names[i])
plt.xlabel('Principal Component 1')
plt.ylabel('Principal Component 2')
plt.title('PCA of Iris Dataset')
plt.legend()
plt.show()

# Explained variance ratio
print("Explained variance ratio:", pca.explained_variance_ratio_)
```
