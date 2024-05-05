Hyperparameter tuning involves selecting the best set of hyperparameters for a model to optimize its performance. Hyperparameters are parameters that are set before the learning process begins
Two popular methods for hyperparameter tuning are **Grid Search** and **Random Search**.

## Grid Search:

Grid Search involves defining a grid of hyperparameter values and evaluating the model performance for each combination of values. It exhaustively searches through all the combinations and selects the best one based on a specified performance metric.

```python
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris

# Load dataset
iris = load_iris()
X, y = iris.data, iris.target

# Define hyperparameters grid
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 5, 10],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

# Create Random Forest Classifier
rf = RandomForestClassifier()

# Perform Grid Search Cross-Validation
grid_search = GridSearchCV(estimator=rf, param_grid=param_grid, cv=5, n_jobs=-1, verbose=2)
grid_search.fit(X, y)

# Best parameters and best score
print("Best Parameters:", grid_search.best_params_)
print("Best Score:", grid_search.best_score_)
```

## Random Search

Random Search selects random combinations of hyperparameters from a defined search space. It's computationally less expensive compared to Grid Search but may not guarantee finding the best combination.

```python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import randint
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris

# Load dataset
iris = load_iris()
X, y = iris.data, iris.target

# Define hyperparameters distribution
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 5, 10],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

# Create Random Forest Classifier
rf = RandomForestClassifier()

# Perform Randomized Search Cross-Validation
random_search = RandomizedSearchCV(estimator=rf, param_distributions=param_dist, n_iter=100, cv=5, n_jobs=-1, verbose=2)
random_search.fit(X, y)

# Best parameters and best score
print("Best Parameters:", random_search.best_params_)
print("Best Score:", random_search.best_score_)
```

Both Grid Search and Random Search have their advantages and are useful in different scenarios. Grid Search is exhaustive but can be computationally expensive, especially with a large number of hyperparameters. Random Search, on the other hand, is more efficient but may not guarantee finding the optimal hyperparameters.
