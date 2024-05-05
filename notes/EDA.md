1. **Data Sourcing:**

    - This involves obtaining the data from various sources such as databases, APIs, CSV files, Excel files, etc. The goal is to gather all the relevant data needed for analysis.

    ```python
    import pandas as pd

    # Reading data from a CSV file
    data = pd.read_csv('example_dataset.csv')

    # Displaying the first few rows of the dataset
    print(data.head())
    ```

2. **Data Cleaning:**

    - Data cleaning involves handling missing values, removing duplicates, dealing with outliers, and transforming the data into a usable format. This ensures the data is accurate and consistent.

    ```python
    # Handling missing values
    data.dropna(inplace=True)

    # Removing duplicates
    data.drop_duplicates(inplace=True)

    # Dealing with outliers (example: replacing outliers with median)
    median = data['column_name'].median()
    data['column_name'] = data['column_name'].apply(lambda x: median if x > upper_bound else x)
    ```

3. **Univariate Analysis:**

    - Univariate analysis focuses on examining the distribution and characteristics of individual variables. This includes calculating summary statistics, visualizing distributions, and identifying patterns.

    ```python
    import matplotlib.pyplot as plt

    # Summary statistics
    print(data['column_name'].describe())

    # Histogram to visualize distribution
    plt.hist(data['column_name'], bins=20)
    plt.xlabel('Variable')
    plt.ylabel('Frequency')
    plt.title('Histogram of Variable')
    plt.show()
    ```

4. **Bivariate Analysis:**

    - Bivariate analysis explores the relationship between two variables. It helps in understanding how one variable affects the other and if there is any correlation or association between them.

    ```python
    # Scatter plot to visualize relationship between two variables
    plt.scatter(data['variable1'], data['variable2'])
    plt.xlabel('Variable 1')
    plt.ylabel('Variable 2')
    plt.title('Scatter Plot of Variable 1 vs Variable 2')
    plt.show()

    # Correlation matrix
    correlation_matrix = data.corr()
    print(correlation_matrix)
    ```
