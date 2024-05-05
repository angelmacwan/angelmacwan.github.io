[[index]]
Hypothesis testing is a fundamental method in statistics used to evaluate an assumption about a population based on evidence from a sample. It's a structured way to analyze data and determine if there's enough reason to believe something different is true about the bigger picture (population) than what we initially assumed.
## Types of Hypothesis Testing
### Z Test
To determine whether a discovery or relationship is statistically significant, hypothesis testing uses a z-test. It usually checks to see if two means are the same (the null hypothesis). Only when the population standard deviation is known and the sample size is 30 data points or more, can a z-test be applied.
### T Test
A statistical test called a t-test is employed to compare the means of two groups. To determine whether two groups differ or if a procedure or treatment affects the population of interest, it is frequently used in hypothesis testing.
### Chi-Square 
You utilize a Chi-square test  for hypothesis testing concerning whether your data is as predicted. To determine if the expected and observed results are well-fitted, the Chi-square test analyzes the differences between categorical variables from a random sample. The test's fundamental premise is that the observed values in your data should be compared to the predicted values that would be present if the null hypothesis were true.

---

**The Steps Involved:**
1. **Formulating the Hypotheses:**
    - **Null Hypothesis (H₀):** This is the default assumption, often stating no difference or effect. Think of it as the baseline scenario.
    - **Alternative Hypothesis (Hₐ):** This is the opposite of the null hypothesis, what you **actually** want to test. It proposes a difference or effect exists.
2. **Choosing a Significance Level (α):**
    - This is the probability of rejecting the null hypothesis when it's actually true (also known as a type I error). It's like the margin of error we're willing to accept. Common significance levels are 0.05 (5%) or 0.01 (1%).
3. **Data Collection:**
    - You collect data through surveys, experiments, or measurements from a representative sample of the population.
4. **Statistical Test and Calculation:**
    - You choose a statistical test appropriate for your data type (e.g., t-test, z-test, chi-square test) and calculate a test statistic based on the sample data.
5. **P-value Determination:**
    - The p-value is the probability of getting a test statistic as extreme or more extreme than what you observed, assuming the null hypothesis is true. Lower p-values indicate stronger evidence against the null hypothesis.
6. **Decision Making:**
    - You compare the p-value to your chosen significance level (α).
        - **If p-value ≤ α:** Reject the null hypothesis. There's enough evidence to support the alternative hypothesis.
        - **If p-value > α:** Fail to reject the null hypothesis. The data doesn't provide strong enough evidence to disprove the null hypothesis.

---
**Example: Vitamin C and the Common Cold**

Imagine you want to test if Vitamin C helps reduce the duration of the common cold.
- **H₀:** Vitamin C has no effect on the common cold duration (null hypothesis).
- **Hₐ:** Vitamin C reduces the common cold duration (alternative hypothesis).
- **α = 0.05 (chosen significance level)**

You conduct a study where one group takes Vitamin C daily and another group takes a placebo while recording their cold duration. After analysis, the p-value from your chosen statistical test is 0.02 (let's say).

Since the p-value (0.02) is less than our significance level (0.05), we reject the null hypothesis. This suggests there's evidence at a 5% significance level that Vitamin C might be effective in reducing cold duration. It's important to note that hypothesis testing doesn't necessarily prove the alternative hypothesis is true, but rather provides evidence against the null hypothesis.