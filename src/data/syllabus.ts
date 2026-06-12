import { Unit } from '../types';

export const ROMANTIC_QUOTES = [
  {
    quote: "Our bond has a correlation of r = 1.0; a perfect positive linear relationship that no outlier in the universe can ever disrupt.",
    context: "Unit II: Describing Relationships"
  },
  {
    quote: "Whether it's a one-tailed or two-tailed hypothesis test, the conclusion always rejects the null and confirms that my love for you is statistically infinite.",
    context: "Unit III: Inferential Statistics"
  },
  {
    quote: "Like a highly optimized Gradient Descent, all my paths iteratively adjust their weights to minimize the cost of being away from you.",
    context: "Unit V: Predictive Analytics"
  },
  {
    quote: "According to the Kaplan-Meier survival estimator, my happiness probability reaches 100% when you are in my input dimensions.",
    context: "Unit V: Survival Analysis"
  },
  {
    quote: "Our relationship's goodness of fit (R²) is exactly 1.0. Every single variation in my heartbeat is perfectly explained by your presence.",
    context: "Unit II & V: Goodness of Fit"
  },
  {
    quote: "Like an Ensemble Boosting algorithm, when we work together, we correct each other's weak predictions and achieve stunning accuracy.",
    context: "Unit IV: Ensemble Models"
  },
  {
    quote: "Your eyes have the highest VC Dimension—they can shatter any shatterable hypothesis I hold and convince me you're perfect.",
    context: "Unit I: Learning Theory"
  },
  {
    quote: "Like the standard normal curve, you are my center, my mean, my median, and my mode—everything in my life centers symmetrically around you.",
    context: "Unit II: Normal Distributions"
  }
];

export const SYLLABUS_DATA: Unit[] = [
  {
    id: 1,
    title: "Unit I: Introduction to Data Science & ML",
    subtitle: "Fundamentals, Quality Data, VC Dimension, and Computational Boundaries",
    summary: "Explores the fundamental need for Data Science, data facets, the 3 Vs of Big Data, the iterative pipeline process, and the core theoretical limitations of machine learning, including VC Dimension and PAC learning boundaries.",
    formulaSheet: [
      { name: "VC Dimension Bound", formula: "N <= 2^d", desc: "Determines the maximum number of points d can shatter in d-dimensional space." },
      { name: "Generalization Error Bound", formula: "E_out(h) <= E_in(h) + sqrt((e_d * ln(2N/d) + ln(4/delta))/N)", desc: "Bound on future performance based on empirical training error and VC dimensions d." },
      { name: "PAC Sample Complexity", formula: "m >= (1/epsilon) * (ln(|H|) + ln(1/delta))", desc: "Calculates minimum sample size m to achieve probably approximately correct learning." }
    ],
    questions: [
      {
        id: "u1_pa1",
        type: "A",
        question: "Define the 'Three Vs' of Big Data and explain why they define the quality boundaries of data science.",
        answer: "The 'Three Vs' represent the core attributes that delineate big data challenges: \n\n1. **Volume:** Indicates the sheer quantity of data generated (Bytes, Petabytes, etc.). \n2. **Velocity:** Refers to the rapid speed at which data is ingested and must be processed (real-time stream analysis versus batched pipelines).\n3. **Variety:** Reflects the diverse data types present: Structured (schemas, database files), Semi-structured (JSON, XML docs), and Unstructured (raw text, call logs, audio, images, streaming video).\n\nUnderstanding these boundaries allows data scientists to allocate computational resources and determine suitable data-cleaning strategies before feeding datasets into machine learning algorithms."
      },
      {
        id: "u1_pa2",
        type: "A",
        question: "State the 5 primary characteristics of high-quality data used to ensure robust model fitting.",
        answer: "Data quality can make or break a machine learning model. The five primary quality characteristics are:\n1. **Validity:** The degree to which data conforms to defined business rules or structural constraints.\n2. **Accuracy:** How close the recorded values are to their true, real-world source values.\n3. **Completeness:** The degree to which all required attribute values are fully populated without missing variables.\n4. **Consistency:** Ensuring the data is uniform with no internal discrepancies across multiple separate data systems.\n5. **Uniformity:** Specifying that the data is represented using identical units of measurement (e.g., all weights in kg, all temperatures in Celsius)."
      },
      {
        id: "u1_pa3",
        type: "A",
        question: "What is VC Dimension (Vapnik-Chervonenkis Dimension) and why is it crucial for machine learning?",
        answer: "The VC Dimension of a hypothesis set H is the size of the largest finite dataset that H can completely 'shatter' (split in all 2^N possible classification states). It measures the representative capacity or complex flexibility of a hypothesis set. It is crucial because it provides formal guarantees for generalization: models with finite VC dimension will not overfit indefinitely if given enough training points, facilitating computational limits on generalization bounds."
      },
      {
        id: "u1_pb1",
        type: "B",
        question: "Elucidate the step-by-step Data Science Process Life Cycle. Fully describe every stage and demonstrate how raw data is converted to actionable insights.",
        answer: "The Data Science Process is modeled as a circular loop consisting of 6 essential, highly co-dependent segments:\n\n### Step 1: Setting the Research Goal\nBefore writing code, engineers define the business problem, identify core constraints, and establish a clear **Project Charter**. This document specifies: what we are trying to predict (the dependent target), how the business benefits, what data inputs are necessary, timetables, and measurable success criteria.\n\n### Step 2: Retrieving Data\nAcquiring both internal data (SQL warehouses, logs, local ERPs) and external data (public open databases like Data.gov, APIs, web scraping, and third-party feeds). At this phase, we verify accessibility rights and evaluate raw data features.\n\n### Step 3: Data Preparation (Cleansing, Integration, and Transformation)\nThis is where more than 70% of a data scientist's effort goes. It breaks down into three sub-phases:\n*   **Data Cleansing:** Eradicating duplicates, correcting typos, and handling outliers or missing records. If data is incorrect, outputs will be intrinsically unreliable ('Garbage in, Garbage out').\n*   **Data Integration:** Merging disparate datasets (e.g., combining patient lab results from one server with outpatient demographics from another) and resolving schema conflicts.\n*   **Data Transformation:** Standardizing and normalizing scales, mapping qualitative tags into integer encodings, or applying log/power transforms to mitigate skewness.\n\n### Step 4: Exploratory Data Analysis (EDA)\nUsing robust statistical graphics (Box plots, histograms, pairplots, correlation heatmaps) to visualize relationships, spot latent anomalies, check statistical assumptions (e.g., assessing normality), and formulate testable hypotheses.\n\n### Step 5: Building Models\nSelecting appropriate statistical models (linear/logistic, random forests, deep neural networks), dividing data into strict train/validation splits, selecting optimal hyperparameters, and evaluating predictive error metrics.\n\n### Step 6: Presenting Findings & Automating Applications\nTranslating abstract performance scores into human-scannable slides or reports for stakeholders, and industrializing the resulting pipelines via APIs block-wrapped in container systems (Docker, Cloud Run) for automated, real-time prediction streams.",
        diagramTitle: "Figure 1.1: The Data Science Life Cycle Loop"
      },
      {
        id: "u1_pb2",
        type: "B",
        question: "Describe the Bias-Variance Tradeoff in statistical learning theory. Prove why seeking the lowest possible empirical error might severely damage downstream generalizes.",
        answer: "The Expected Prediction Error of any machine learning model on unseen test sets can be mathematically partitioned into three distinct components: Bias², Variance, and Irreducible Noise.\n\n### 1. Mathematical Breakdown\nLet our target function be Y = f(X) + e, where E[e] = 0 and Var(e) = s_e² (irreducible noise). Let h(X) be the model hypothesis learned. The expected prediction error at point x is:\n\n`E[(Y - h(X))²] = (E[h(X)] - f(X))² + E[(h(X) - E[h(X)])²] + s_e²`\n`Expected Error = Bias² + Variance + Irreducible Noise`\n\n### 2. Conceptual Definition\n*   **Bias:** Represents the systematic error introduced by simplifying assumptions in the model. A high-bias model (e.g., fitting a flat linear regression to highly non-linear data) consistently misses the trend, resulting in *Underfitting*.\n*   **Variance:** Reflects the model's sensitivity to small fluctuations in the training set. A high-variance model (e.g., fitting a high-degree polynomial) conforms perfectly to training points, including background noise. This results in *Overfitting*.\n\n### 3. The Tradeoff Dynamics\nAs we increase model complexity (e.g., widening neural networks or deepening trees), Bias drops rapidly, but Variance increases. Minimizing training error (empirical risk) to absolute zero forces the model to align with arbitrary noise artifacts. Generalization (test set accuracy) degrades dramatically when Variance dominates. The goal is to identify the global minimum under the total error curve where both elements are balanced.",
        diagramTitle: "Figure 1.2: Bias-Variance Error vs. Model Complexity Curve"
      },
      {
        id: "u1_pc1",
        type: "C",
        question: "Unit I Case Study: Designing a PAC-Learning Generalization Framework for Fraud Detection",
        answer: "### 1. Scenario\nA fintech start-up processes millions of credit transactions. As Lead Engineer, you must build an inductive binary classifier using an extremely clean, quality-checked historical transaction dataset. You need theoretical mathematical bounds to prove that the system's operational false-alarm rate is strictly limited before deploying to production.\n\n### 2. Design Action plan\n*   **Generalization Goal:** We require that the difference between the model's empirical error in training and its real-world true error is at most epsilon = 0.05, with high probability (1 - delta) >= 0.99 (delta = 0.01).\n*   **Hypothesis Complexity Boundary:** We estimate our rules form a finite hypothesis set with size |H| = 10,000.\n*   **Sample Complexity Calculation:** Applying the formal sample bound equation:\n\n`m >= (1 / epsilon) * ( ln(|H|) + ln(1 / delta) )`\n`m >= (1 / 0.05) * ( ln(10000) + ln(1 / 0.01) )`\n`m >= 20 * ( 9.2103 + 4.6051 )`\n`m >= 20 * 13.8154 = 276.3`\n\nWe mathematically demonstrate that we need at least 277 clean, independent transaction historical logs to deliver on these rigorous bounds.\n\n*   **Data Integrity Check:** To satisfy the strict requirements of uniform PAC assumptions, we design a preprocessing microservice that scrubs missing fields (Validity check) and rescales amounts (Consistency check). This ensures our training sample perfectly reflects the real-world operational distributions."
      }
    ]
  },
  {
    id: 2,
    title: "Unit II: Descriptive Analytics",
    subtitle: "Frequency Distributions, Averages, Variabilities, and the Normal Curve",
    summary: "Delves into techniques for summarizing, describing, and visualizing quantitative and qualitative distributions. Establishes computational measures of central tendency, range, variance, standard deviation, and the standard normal table (Z-scores).",
    formulaSheet: [
      { name: "Grouped Mean", formula: "x_bar = (sum(f_i * x_i)) / n", desc: "Calculates the weighted average for grouped class intervals with midpoint x_i and frequency f_i." },
      { name: "Sample Variance (s²)", formula: "s^2 = (sum(x_i - x_bar)^2) / (n - 1)", desc: "Unbiased estimator of variance. Notice the division by degrees of freedom (n - 1) instead of n." },
      { name: "Z-score Formula", formula: "z = (x - mu) / sigma", desc: "Transforms any raw point from a normal distribution into standard normal deviations." },
      { name: "Interquartile Range (IQR)", formula: "IQR = Q3 - Q1", desc: "Calculates the robust range of the middle 50% of sorted data, stripping out the influence of extreme outliers." }
    ],
    questions: [
      {
        id: "u2_pa1",
        type: "A",
        question: "Describe the core difference between Discrete data and Continuous data from a descriptive analytics perspective.",
        answer: "The difference lies in numerical countability:\n*   **Discrete Data:** Comprises values recorded strictly in countable whole numbers (e.g., the number of children in a household, cars crossing a bridge). It cannot contain decimals or fractional increments.\n*   **Continuous Data:** Can take an infinite number of values within a given interval. Values represent precise physical measurements that naturally utilize decimal variables (e.g., weight of patients, temperature of a hospital ward, study hours of a student: 33.47 hours).\n\nContinuous data requires continuous probability density functions (like the Normal distribution) rather than simple discrete counts."
      },
      {
        id: "u2_pa2",
        type: "A",
        question: "Explain why the Mean is highly sensitive to outliers while the Median is robust, utilizing a simple illustrative dataset.",
        answer: "The *Mean* incorporates the actual magnitude of every single value in the dataset: `Mean = sum(x_i) / n`. If we have a dataset A: `[64, 65, 66, 68, 70, 71, 73]`, the Mean is `68.1` and the Median is `68`.\n\nIf we introduce one extreme outlier to create dataset B: `[64, 65, 66, 68, 70, 71, 730]`, the Mean gets pulled heavily, shifting to `162.0`. However, the *Median*, which represents the exact middle position in the sorted list, remains completely unchanged at `68`.\n\nThus, when dealing with skewed distributions (e.g., household incomes, transaction amounts), the Median provides a more robust profile of the center than the Mean."
      },
      {
        id: "u2_pa3",
        type: "A",
        question: "Explain the visual structure of a Stem-and-Leaf display and list its two primary advantages over traditional histograms.",
        answer: "A Stem-and-Leaf display is a device for sorting quantitative data by splitting each number into a leading digit (the **stem**) and trailing digit (the **leaf**). For example, number 34 is shown on stem 3 with leaf 4.\n\nIts two unique advantages are:\n1.  **Original Data Preservation:** Unlike histograms which group data into generic class intervals, a stemplot retains the exact numerical values of all observations.\n2.  **Native Sorting:** By design, it dynamically structures and sorts the database from smallest to largest, facilitating quick midpoint (median) and quartile detection."
      },
      {
        id: "u2_pb1",
        type: "B",
        question: "Derive the step-by-step calculation of Sample Variance and Sample Standard Deviation for the following raw dataset: [7, 9, 5, 13, 3, 11, 15, 9]. Show all mathematical steps.",
        answer: "Let's perform the complete, unbiased evaluation:\n\n### Step 1: Calculate the Sample Mean (x_bar)\nWe aggregate our data and divide by the total observations (n = 8):\n`x_bar = (7 + 9 + 5 + 13 + 3 + 11 + 15 + 9) / 8`\n`x_bar = 72 / 8 = 9`\n\n### Step 2: Compute individual deviations from the mean (x_i - x_bar)\nSubtract 9 from each of the values:\n*   `(7 - 9) = -2`\n*   `(9 - 9) = 0`\n*   `(5 - 9) = -4`\n*   `(13 - 9) = 4`\n*   `(3 - 9) = -6`\n*   `(11 - 9) = 2`\n*   `(15 - 9) = 6`\n*   `(9 - 9) = 0`\n\n*Note:* The sum of these deviations is strictly zero: `-2 + 0 - 4 + 4 - 6 + 2 + 6 + 0 = 0`. This is a universal mathematical property, which is why we must square them.\n\n### Step 3: Square each deviation (x_i - x_bar)²\n*   `(-2)² = 4`\n*   `(0)² = 0`\n*   `(-4)² = 16`\n*   `(4)² = 16`\n*   `(-6)² = 36`\n*   `(2)² = 4`\n*   `(6)² = 36`\n*   `(0)² = 0`\n\n### Step 4: Sum the squared deviations (Sum of Squares - SS)\n`SS = 4 + 0 + 16 + 16 + 36 + 4 + 36 + 0 = 112`\n\n### Step 5: Compute Sample Variance (s²)\nDivide SS by degrees of freedom `(n - 1) = 8 - 1 = 7`:\n`s² = 112 / 7 = 16`\n\n### Step 6: Compute Sample Standard Deviation (s)\nTake the square root of the variance:\n`s = sqrt(16) = 4`\n\n*Interpretation:* On average, the actual values in our database deviate by 4 units from our central mean of 9.",
        diagramTitle: "Figure 2.1: Deviation Mappings from Central Mean"
      },
      {
        id: "u2_pb2",
        type: "B",
        question: "Consider a normally distributed target population with a mean of 110 lbs and a standard deviation of 29.7 lbs. Compute the exact probability that a randomly drawn observation measures below 82 lbs. Explain the standard normal mapping.",
        answer: "We are given: `mu = 110`, `sigma = 29.7`. We want to evaluate the probability `P(X < 82)`.\n\n### Step 1: Standardize the variable X into a standard normal Z-score\nUsing the transform equation:\n`z = (x - mu) / sigma`\n`z = (82 - 110) / 29.7`\n`z = -28 / 29.7`\n`z = -0.9428` (Rounding to 2 decimal places: `-0.94`)\n\n### Step 2: Interpret the Z-Score\nOur Z-score of `-0.94` informs us that our clinical observation of 82 lbs is exactly `0.94` standard deviations below the population mean of 110 lbs.\n\n### Step 3: Read the Standard Normal Table (Cumulative from left)\n*   Locate the `-0.9` row in the Z-table.\n*   Read across to the `0.04` column.\n*   The intersecting value represents the cumulative area to the left of Z = -0.94:\n    `P(Z < -0.94) = 0.1736`\n\n### Step 4: Final Probabilistic Conclusion\n`P(X < 82) = 0.1736` or **17.36%**.\nThere is a 17.36% chance that a participant selected at random will have a weight below 82 lbs.",
        diagramTitle: "Figure 2.2: Distribution curves mapping X to Z"
      },
      {
        id: "u2_pc1",
        type: "C",
        question: "Unit II Practical Case: Outlier Detection and Interquartile (IQR) Filtering in Clinical EHR",
        answer: "### 1. Scenario\nA diagnostic hospital records blood sugar levels. Outliers routinely skew automated summaries. You need to establish an automated IQR fence filtering system to detect malfunctioning sensors.\n\n### 2. Analytical Implementation Plan\n*   **Given Dataset:** `[88, 92, 95, 98, 101, 105, 110, 115, 120, 128, 250]` (n = 11, sorted)\n*   **Calculate Quartiles:**\n    *   `Median (Q2) = Index 6 = 105`\n    *   `Lower Half = [88, 92, 95, 98, 101] -> Median (Q1) = 95`\n    *   `Upper Half = [110, 115, 120, 128, 250] -> Median (Q3) = 120`\n    *   `IQR = Q3 - Q1 = 120 - 95 = 25`\n*   **Determine Outer Fences (Tukey's Outlier Rule):**\n    *   `Lower Limit = Q1 - 1.5 * IQR = 95 - (1.5 * 25) = 95 - 37.5 = 57.5`\n    *   `Upper Limit = Q3 + 1.5 * IQR = 120 + (1.5 * 25) = 120 + 37.5 = 157.5`\n*   **Identify Outlying Observations:**\n    Any data point below `57.5` or above `157.5` is labeled as an outlier. Looking at our list, the value `250` lies far beyond our upper boundary limit of `157.5` and is successfully flagged as a severe anomaly, representing a faulty reading. The rest of the data points reside comfortably inside our safe fences."
      }
    ]
  },
  {
    id: 3,
    title: "Unit III: Inferential Statistics & Hypothesis Testing",
    subtitle: "Hypothesis Mappings, Z-test, T-test, and Confidence Intervals",
    summary: "Builds from basic probability to advanced inference. Establishes the rigorous pathways of Hypothesis testing, covering Null vs Alternative statements, Type I/II errors, Z-tests for single populations, and Single/Independent sample T-tests.",
    formulaSheet: [
      { name: "Single Population z-test", formula: "z_ratio = (x_bar - mu) / (sigma / sqrt(n))", desc: "Used when the actual population standard deviation sigma is known." },
      { name: "Estimated Standard Error", formula: "s_(x_bar) = s / sqrt(n)", desc: "Quantifies the standard error of a sample mean when the population standard deviation is unknown." },
      { name: "Student t-ratio (Single Sample)", formula: "t = (x_bar - mu) / s_(x_bar)", desc: "Statistically evaluates differences, drawing distributions based on degrees of freedom (df = n - 1)." },
      { name: "Pooled Variance (Independent T)", formula: "s_p^2 = (SS1 + SS2) / (n1 + n2 - 2)", desc: "Combines two separate sample variances into a single unified estimate assuming equal population variances." }
    ],
    questions: [
      {
        id: "u3_pa1",
        type: "A",
        question: "Define Type I Error and Type II Error in hypothesis testing, and explain how they relate to the Level of Significance.",
        answer: "These represent the two primary conceptual decision errors in statistics:\n*   **Type I Error (False Alarm / Alpha):** Occurs when we reject a true null hypothesis (Null is true, but we claim an effect exists). The probability of committing this error is strictly controlled by our *Level of Significance (alpha)*, usually set to `.05`.\n*   **Type II Error (Miss / Beta):** Occurs when we retain/fail to reject a false null hypothesis (an actual treatment effect exists, but our test fails to catch it).\n\nReducing alpha directly increases beta for a fixed sample size. The only way to simultaneously decrease both errors is to increase the sample size."
      },
      {
        id: "u3_pa2",
        type: "A",
        question: "When should we choose a T-test over a Z-test? Define the key criteria.",
        answer: "We must choose a T-distribution instead of a Z-distribution when:\n1.  The true **population standard deviation (sigma)** is **unknown** (which forces us to estimate it using our sample standard deviation `s`).\n2.  The sample size is relatively small (typically `n < 30`).\n\nIf the population variance is known and the sample is large, standard normal Z-tests are appropriate."
      },
      {
        id: "u3_pa3",
        type: "A",
        question: "Define the term 'Degrees of Freedom' (df) in the context of a single-sample T-test.",
        answer: "Degrees of Freedom (df) refers to the number of observation values in a dataset that are completely free to vary under a mathematical restriction. For a single-sample T-test calculations are based on deviances from a sample mean. Because the sum of all deviances from the mean must strictly sum to zero, once we know `n - 1` deviances, the final deviance is fixed. Thus, `df = n - 1`."
      },
      {
        id: "u3_pb1",
        type: "B",
        question: "Conduct a comprehensive step-by-step Independent Samples T-test using the following experimental data. \nGroup 1 (EPO Treatment): n1 = 6, Mean = 11, SS1 = 90. \nGroup 2 (Control placebo): n2 = 6, Mean = 6, SS2 = 72. \nTest at a 5% level of significance if the treatment increases performance.",
        answer: "Let us perform this vital statistical test systematically:\n\n### Step 1: Formulate Hypotheses\nWe want to test if the Treatment Group (Group 1) has significantly higher scores than the Control Placebo Group (Group 2):\n*   `Null Hypothesis (H0): mu1 - mu2 <= 0` (No training advantage)\n*   `Alternative Hypothesis (H1): mu1 - mu2 > 0` (One-tailed directional test)\n\n### Step 2: State Decision Rule\nWith `df = n1 + n2 - 2 = 6 + 6 - 2 = 10` and `alpha = 0.05` for a one-tailed test:\nConsulting critical T-tables, we find `t_critical = 1.812`.\nRule: Reject H0 if the calculated `t_ratio >= 1.812`.\n\n### Step 3: Compute Pooled Variance (s_p²)\n`s_p² = (SS1 + SS2) / (n1 + n2 - 2)`\n`s_p² = (90 + 72) / (6 + 6 - 2)`\n`s_p² = 162 / 10 = 16.2`\n\n### Step 4: Compute Standard Error of the Difference (s_x1-x2)\n`s_x1-x2 = sqrt( (s_p² / n1) + (s_p² / n2) )`\n`s_x1-x2 = sqrt( (16.2 / 6) + (16.2 / 6) )`\n`s_x1-x2 = sqrt( 2.7 + 2.7 ) = sqrt(5.4) = 2.32`\n\n### Step 5: Compute the T-test Statistic (t_ratio)\n`t = ( (x_bar1 - x_bar2) - (mu1 - mu2)_hyp ) / s_x1-x2`\n`t = ( (11 - 6) - 0 ) / 2.32`\n`t = 5 / 2.32 = 2.16`\n\n### Step 6: Make Decision and Interpret\nOur calculated `t = 2.16` exceeds our critical threshold boundary of `1.812`. Thus, we **Reject H0** at the `0.05` level of significance.\n\n*Clinical Conclusion:* There is statistically significant evidence that the active treatment increases physical performance scores compared to the placebo.",
        diagramTitle: "Figure 3.1: Critical Rejection Regions on a Student-T curve"
      },
      {
        id: "u3_pb2",
        type: "B",
        question: "An investigator wants to construct a 95% Confidence Interval for the mean IQ scores of a local district based on a random sample of 25 students. The sample Mean is 105, and the standard error is known to be 3. Explain how the interval works and interpret the results.",
        answer: "This is an estimation problem utilizing a Z-based confidence interval:\n\n### Step 1: Identify Parameters\n`n = 25`, `x_bar = 105`, `standard_error (s_x_bar) = 3`.\n\n### Step 2: Establish Cumulative Z critical limits\nFor a 95% confidence interval, the area left out in the tails is 5% total (2.5% in each tail). Consulting standard normal tables:\n`z_critical = 1.96`\n\n### Step 3: Compute Margin of Error\n`Margin of Error = z_critical * standard_error`\n`Margin of Error = 1.96 * 3 = 5.88`\n\n### Step 4: Construct the Interval Boundaries\n`CI = x_bar ± Margin of Error`\n`CI = 105 ± 5.88`\n*   `Lower Limit = 105 - 5.88 = 99.12`\n*   `Upper Limit = 105 + 5.88 = 110.88`\n\n### Step 5: Interpretation (Extremely Important for Exams)\n*Incorrect:* 'There is active 95% probability that the true mean lies between 99.12 and 110.88.' (The population parameter is constant; it doesn't move randomly).\n*Correct:* 'If we took 100 random samples and constructed intervals this way, 95 of them would succeed in containing the true population mean.' Thus, we are **95% confident that the true population mean IQ of the school district is between 99.12 and 110.88**.",
        diagramTitle: "Figure 3.2: 95% Confidence Interval Range Mappings"
      },
      {
        id: "u3_pc1",
        type: "C",
        question: "Unit III Practice Case: Quantitative Evaluation of Drug Trials with Statistical Power",
        answer: "### 1. Scenario\nYou are analyzing a new pharmaceutical compound. A random sample of 100 patients yields a resting heart rate mean of 78 bpm, compared to a baseline historical population mean of 80 bpm with standard deviation = 10. Test at a 5% level of significance.\n\n### 2. Computational Execution Plan\n*   **State Hypotheses:** `H0: mu = 80`, `H1: mu != 80` (Two-tail test).\n*   **Calculate Standard Error:** `sigma_x_bar = 10 / sqrt(100) = 1.0`.\n*   **Calculate Z-statistic:** `z = (78 - 80) / 1.0 = -2.00`.\n*   **Decision Rule:** At `alpha = 0.05`, critical limits are `±1.96`.\n*   **Conclusion:** Since our calculated `z = -2.00` lies beyond our critical threshold of `-1.96`, we reject H0. There are statistically significant clinical changes.\n*   **Practical Effect Size Evaluation:**\n\n`Cohen's d = |x_bar - mu| / sigma = |78 - 80| / 10 = 0.20` (A small, subtle therapeutic effect)."
      }
    ]
  },
  {
    id: 4,
    title: "Unit IV: ANOVA & Categorical Analysis",
    subtitle: "One-Way ANOVA, Post-Hoc Tukey's HSD, and Chi-Square Tests",
    summary: "Expands hypothesis testing to multiple group means via Analysis of Variance (ANOVA). Unpacks Sum of Squares partitioned into between and within sources, and reviews Chi-Square Tests for evaluating categorical associations.",
    formulaSheet: [
      { name: "ANOVA Total Sum of Squares", formula: "SS_total = sum(x_ij^2) - (G^2 / N)", desc: "Examines total raw variation across all scores with Grand Total G and size N." },
      { name: "ANOVA Between Sum of Squares", formula: "SS_between = sum(T_j^2 / n_j) - (G^2 / N)", desc: "Measures variation between separate treatment groups with Group Totals T_j." },
      { name: "F-Ratio Statistic", formula: "F = MS_between / MS_within", desc: "Compares systematic treatment effects against basic random error." },
      { name: "Chi-Square Test (X²)", formula: "X^2 = sum( (O - E)^2 / E )", desc: "Measures categorical deviation between observed cell counts O and expected counts E." }
    ],
    questions: [
      {
        id: "u4_pa1",
        type: "A",
        question: "State the three core assumptions required for performing a One-Way ANOVA test.",
        answer: "To ensure the mathematical validity of an F-test, three assumptions must hold:\n1.  **Normality:** The dependent variable must be approximately normally distributed for each of the experimental treatment groups.\n2.  **Independence:** Every observation must be independent of every other (no related pairwise ratings; scores are drawn via random sampling).\n3.  **Homogeneity of Variance (Homoscedasticity):** The variances of the treatment populations must be roughly equal (i.e. same standard deviation σ across groups)."
      },
      {
        id: "u4_pa2",
        type: "A",
        question: "Explain why we must use ANOVA instead of multiple pairwise T-tests to compare three or more treatment group means.",
        answer: "If we compare three groups using T-tests, we must perform 3 separate tests (A vs B, B vs C, A vs C). Each independent test carries a Type I Error probability of `alpha = 0.05`.\n\nThe overall cumulative probability of making at least one false alarm across our series is: `Familywise Error = 1 - (1 - alpha)^k = 1 - (1 - 0.05)³ = 0.143` or **14.3%**!\n\nThis dramatic inflation of false-alarm rates is called *Type I Error Inflation*. **ANOVA** bypasses this entirely by performing a single, unified global evaluation (the F-test) at a strict, stable 5% level."
      },
      {
        id: "u4_pa3",
        type: "A",
        question: "What does Tukey's HSD (Honestly Significant Difference) test determine and when should it be executed?",
        answer: "An ANOVA F-test is purely *omnibus*—it only informs us that a significant difference exists somewhere, but does not specify *where*. \n\n**Tukey's HSD** is a pairwise post-hoc test. It calculates the minimum required distance between any two group means to label them as 'significantly different'. It should be executed **only** after our main ANOVA F-test yields a statistically significant outcome."
      },
      {
        id: "u4_pb1",
        type: "B",
        question: "Calculate a complete One-Way ANOVA F-test for three medical clinics testing alternative recovery diets. \nGiven Group Totals: Clinic 1 (Medication): n1=3, Mean=5, T1=15. \nClinic 2 (Exercise): n2=3, Mean=6, T2=18. \nClinic 3 (Diet): n3=3, Mean=4, T3=12. \nGiven Sum of Squared Raw Scores: sum(x²_ij) = 279, G = 45, N = 9. Test if an effect exists at alpha = 0.05.",
        answer: "Let us conduct this complex analysis systematically:\n\n### Step 1: Hypotheses\n*   `H0: mu1 = mu2 = mu3` (Diets have identical recovery times)\n*   `H1: At least one clinic mean is different`\n\n### Step 2: Sum of Squares (SS) Partitioning\n*   **Total Sum of Squares (SS_total):**\n    `SS_total = sum(x²_ij) - (G² / N)`\n    `SS_total = 279 - (45² / 9) = 279 - (2025 / 9) = 279 - 225 = 54`\n\n*   **Between Groups Sum of Squares (SS_between):**\n    `SS_between = sum(T_j² / n_j) - (G² / N)`\n    `SS_between = [ (15² / 3) + (18² / 3) + (12² / 3) ] - 225`\n    `SS_between = [ (225 / 3) + (324 / 3) + (144 / 3) ] - 225`\n    `SS_between = [ 75 + 108 + 48 ] - 225 = 231 - 225 = 6`\n\n*   **Within Groups Sum of Squares (SS_within):**\n    `SS_within = SS_total - SS_between = 54 - 6 = 48`\n\n### Step 3: Calculate degrees of freedom (df)\n*   `df_total = N - 1 = 9 - 1 = 8`\n*   `df_between = k - 1 = 3 - 1 = 2` (where k represents 3 groups)\n*   `df_within = N - k = 9 - 3 = 6`\n\n### Step 4: Calculate Mean Squares (MS)\n*   `MS_between = SS_between / df_between = 6 / 2 = 3`\n*   `MS_within = SS_within / df_within = 48 / 6 = 8`\n\n### Step 5: Compute the F-Ratio\n`F = MS_between / MS_within = 3 / 8 = 0.375`\n\n### Step 6: Make Decision\nConsulting our F-distribution tables with `df_numerator = 2` and `df_denominator = 6`, we find `F_critical = 5.14`.\n\nSince our calculated `F = 0.375` is much smaller than `5.14`, we **Retain H0** (Fail to reject).\n\n*Conclusion:* There is no statistically significant difference in raw recovery performance across the three diets. We retain the null hypothesis.",
        diagramTitle: "Figure 4.1: Partition of Variances Flowchart"
      },
      {
        id: "u4_pb2",
        type: "B",
        question: "Explain the Chi-Square Test of Independence. Provide a detailed walkthrough of computing expected cell frequencies and the resulting test statistic from raw counts.",
        answer: "The **Chi-Square Test of Independence** is a non-parametric statistics routine used to check if a significant relationship exists between two qualitative categorical variables (represented in a contingency table).\n\n### 1. Mathematical Structure of Expected Frequencies (E)\nAssuming the null hypothesis of absolute independence is true, the expected count in any joint table cell (at row i, column j) is strictly proportional to total row and column counts:\n`Expected Frequency (E_ij) = (Row Total * Column Total) / Grand Total (N)`\n\n### 2. Calculating the Deviation Statistic (X²)\nWe sum the relative squared differences across all cells standardizing by the expected limits:\n`X² = sum( (Observed - Expected)² / Expected )`\n\nIf the differences are small, the resulting `X²` is close to zero, validating independence. If cells deviate significantly, `X²` rises. We check this against critical limits determined by our degrees of freedom:\n`df = (rows - 1) * (columns - 1)`\n\n### 3. Limitations of Chi-Square\n*   Exquisitely sensitive to total sample size. In small sets, small random variations skew the results, which is why we must ensure **every expected cell count is >= 5**.\n*   It determines if an association exists, but cannot establish any causal directions.",
        diagramTitle: "Figure 4.2: Contingency Table Deviation Grid Map"
      },
      {
        id: "u4_pc1",
        type: "C",
        question: "Unit IV Comprehensive Case: Categorical Educational Level vs Gender Choice Evaluation",
        answer: "### 1. Scenario\nA random sample of 395 university alumni maps their raw counts across Gender and completed Degree Level:\n*   High School: Observed Female = 60, Male = 40 (Total = 100)\n*   Bachelors: Observed Female = 54, Male = 44 (Total = 98)\n*   Masters: Observed Female = 46, Male = 53 (Total = 99)\n*   Ph.D: Observed Female = 41, Male = 57 (Total = 98)\n*   Grand Total: Female Total = 201, Male Total = 194, N = 395.\n\nTest at a 5% level of significance.\n\n### 2. Computational execution plan\n*   **Formulate Hypotheses:** `H0: Degree level is independent of Gender`, `H1: A real association holds`.\n*   **Calculate Expected Counts:**\n    `E_HighSchool_Female = (100 * 201) / 395 = 50.89`, `E_HighSchool_Male = 100 - 50.89 = 49.11`.\n    Repeating across all 8 contingency cells, we evaluate Expected vs Observed.\n*   **Compute Cell Deviations (O - E)² / E:**\n    `Cell [1,1] (Female HighS): (60 - 50.89)² / 50.89 = 83.00 / 50.89 = 1.63`.\n    `Cell [1,2] (Male HighS): (40 - 49.11)² / 49.11 = 83.00 / 49.11 = 1.69`.\n    Aggregating all cells yields our total deviation: `X²_total = 9.837`.\n*   **Evaluate against Threshold Boundary:**\n    `df = (2 - 1) * (4 - 1) = 3`. For `alpha = 0.05`, critical table lookup yields `X²_critical = 7.815`.\n\nSince our calculated `X²_total = 9.837` exceeds our critical threshold boundary `7.815`, we **Reject H0**.\n\n*Alumni Conclusion:* Degree Level and Gender are statistically dependent at the 5% active level of significance."
      }
    ]
  },
  {
    id: 5,
    title: "Unit V: Predictive Analytics",
    subtitle: "Least Squares Regression, Time Series Forecasting, and Survival Analysis",
    summary: "Examines algorithms for predicting future targets. Masterfully handles both continuous regression curves, Goodness of Fit measures, Time-series moving averages, and advanced Survival Analysis probability functions.",
    formulaSheet: [
      { name: "Least Squares Slope (m)", formula: "m = (n*sum(xy) - sum(x)*sum(y)) / (n*sum(x^2) - (sum(x))^2)", desc: "Calculates the mathematically optimal slope of our linear decision boundary." },
      { name: "R² Coefficient", formula: "R^2 = 1 - (RSS / TSS)", desc: "Measures exactly what proportion of variance in our targets is explained by our model." },
      { name: "Kaplan-Meier Estimator", formula: "S(t) = Product_i: (n_i - d_i) / n_i", desc: "Constructs the continuous probability of survival curves over time intervals with size n_i." },
      { name: "Sigmoid Activation Mapping", formula: "P(x) = 1 / (1 + e^-(beta0 + beta1*x))", desc: "Transforms linear unbounded scores into safe probabilistic boundaries between 0 and 1." }
    ],
    questions: [
      {
        id: "u5_pa1",
        type: "A",
        question: "Define the difference between Simple Linear Regression and Logistic Regression from an outcome perspective.",
        answer: "The core difference lies in the nature of their targets:\n*   **Simple Linear Regression:** Models continuous outcomes directly as raw unbounded numbers (e.g., house prices, student test grades). It uses ordinary least squares to minimize squared residuals.\n*   **Logistic Regression:** Models binary classification states (0 or 1, Yes or No, e.g., Patient passes/fails an exam). It fits a S-shaped *Sigmoid curve* to output true probability boundaries between `0.0` and `1.0` using Maximum Likelihood Estimation (MLE)."
      },
      {
        id: "u5_pa2",
        type: "A",
        question: "What are the components of a Time Series, and how does a Moving Average isolate the Trend?",
        answer: "A raw time series consists of 4 distinct underlying mathematical components:\n1.  **Trend:** The permanent, long-term general direction of values (upward or downward).\n2.  **Seasonality:** Repeating, highly predictable cycles occurring within finite periods (weekly, monthly, quarterly spikes).\n3.  **Cycle:** Long-term oscillations with variable duration (typically lasting multiple years, tied to economic waves).\n4.  **Noise:** Unpredictable, random daily fluctuations.\n\nA **Moving Average** divides the raw sequence into rolling windows (e.g., a 7-day window) and averages the local values. By taking averages, it smooths out rapid noise and isolates the underlying Trend."
      },
      {
        id: "u5_pa3",
        type: "A",
        question: "Explain the concept of 'Censoring' in Survival Analysis.",
        answer: "In Survival Analysis, **Censoring** occurs when we have incomplete, partial information about a subject's time-to-event. For example, a patient drops out of a medical study, moves away, or the study reaches its calendar limit before the patient dies (the target event occurs).\n\nInstead of discarding these valuable data points, we classify them as 'Right-Censored'. They provide proof that the patient survived *at least* up to the last recorded timestamp."
      },
      {
        id: "u5_pb1",
        type: "B",
        question: "Perform a complete Least Squares Regression calculation. Given Dataset: \nHours Studied (x): [5, 8, 7, 6, 4] \nExam Grade (y): [3, 4, 5, 2, 1]\nCalculate the Slope (m), Y-intercept (c), write the Regression Equation, and evaluate the predicted grade for 10 hours.",
        answer: "Let us perform this vital calculation systematically:\n\n### Step 1: Set up computational columns (n = 5)\n*   `x: [5, 8, 7, 6, 4] -> sum(x) = 30`\n*   `y: [3, 4, 5, 2, 1] -> sum(y) = 15`\n*   `xy: [15, 32, 35, 12, 4] -> sum(xy) = 98`\n*   `x²: [25, 64, 49, 36, 16] -> sum(x²) = 190`\n\n### Step 2: Compute Slope (m)\n`m = (n * sum(xy) - (sum(x) * sum(y))) / (n * sum(x²) - (sum(x))²)`\n`m = (5 * 98 - (30 * 15)) / (5 * 190 - 30²)`\n`m = (490 - 450) / (950 - 900)`\n`m = 40 / 50 = 0.80`\n\n### Step 3: Compute Y-Intercept (c)\nWe use the centroids of our data:\n`x_mean = 30 / 5 = 6`\n`y_mean = 15 / 5 = 3`\n`c = y_mean - m * x_mean`\n`c = 3 - (0.80 * 6) = 3 - 4.8 = -1.8`\n\n### Step 4: Write the Regression Equation\n`y = 0.80x - 1.8`\n\n### Step 5: Evaluate predictions and residuals for our data\n*   For `x = 5`: `y_pred = 0.8*5 - 1.8 = 2.2`. (Observed = 3, Residual e = 0.8)\n*   For `x = 8`: `y_pred = 0.8*8 - 1.8 = 4.6`. (Observed = 4, Residual e = -0.6)\n*   For `x = 7`: `y_pred = 0.8*7 - 1.8 = 3.8`. (Observed = 5, Residual e = 1.2)\n*   For `x = 6`: `y_pred = 0.8*6 - 1.8 = 3.0`. (Observed = 2, Residual e = -1.0)\n*   For `x = 4`: `y_pred = 0.8*4 - 1.8 = 1.4`. (Observed = 1, Residual e = -0.4)\n\nSum of Squared Residuals `(RSS) = 0.8² + (-0.6)² + 1.2² + (-1.0)² + (-0.4)² = 0.64 + 0.36 + 1.44 + 1.00 + 0.16 = 3.6`.\n\n### Step 6: Forecast for x = 10 Hours\n`y_pred = 0.80 * (10) - 1.8 = 8.0 - 1.8 = 6.2`\nOur model predicts an exam grade of **6.2** if Steniha studies for 10 hours.",
        diagramTitle: "Figure 5.1: The Line of Best Fit with Least Squares Residuals"
      },
      {
        id: "u5_pb2",
        type: "B",
        question: "Explain the Kaplan-Meier Estimator for Survival Analysis. Demonstrate step-by-step how to construct a survival curve table from raw trial data.",
        answer: "The **Kaplan-Meier Estimator** builds continuous survival probability curves over interval-based timelines.\n\n### 1. Mathematical Formula\nThe survival probability $S(t)$ at any time step t is calculated as the cumulative product of conditional probabilities:\n`S(t) = Product_i: [ (n_i - d_i) / n_i ]`\nWhere:\n*   `n_i` represents patients at risk immediately before timestamp i.\n*   `d_i` represents patients who died (the event occurred) at timestamp i.\n\n### 2. Step-by-Step Construction with Sample Calculations\nConsider a clinical cohort starting with 20 subjects:\n*   **At t = 0 (Start):** `n_0 = 20`. No deaths. `S(0) = 1.000`.\n*   **At t = 1 Year:** `d_1 = 1` patient dies. Patients remaining at risk: `n_1 = 20`.\n    `Probability = (20 - 1)/20 = 19/20 = 0.95`. Cumulative: `S(1) = 1.0 * 0.95 = 0.95`.\n*   **At t = 2 Years:** 1 patient dropped out (censored, marked as `1`). Candidates remaining at risk: `n_2 = 18` (since 1 died and 1 censored).\n    Cumulative: `S(2) = S(1) * 1.0 = 0.95` (no deaths at year 2).\n*   **At t = 3 Years:** 1 patient dies. Candidates at risk: `n_3 = 18`.\n    `Probability = (18 - 1)/18 = 17/18 = 0.944`.\n    Cumulative: `S(3) = 0.95 * 0.944 = 0.897`.\n\n### 3. Visual Layout\nWe plot this data as a step function. The horizontal lines represent steady intervals while vertical drops show precise events of death.",
        diagramTitle: "Figure 5.2: Kaplan-Meier Step Survival Curve Visualization"
      },
      {
        id: "u5_pc1",
        type: "C",
        question: "Unit V Comprehensive Design: Modeling Student Exam Passing Probabilities with Logistic Sigmoids",
        answer: "### 1. Challenge Scenario\nYou are modeling student exam passing status (0 = Fail, 1 = Pass). Based on extensive study hour records, your optimized coefficients are estimated via Maximum Likelihood Estimation as: `beta0 (Intercept) = -64`, and `beta1 (Slope) = 2`.\n\n### 2. Computational execution plan\n*   **Determine the linear decision boundary formula (logit z):**\n    `z = beta0 + beta1 * hours`\n    `z = -64 + 2 * (hours)`\n*   **Let us evaluate the probability of passing for a student who studies X = 33 Hours:**\n    `z = -64 + 2 * (33) = -64 + 66 = 2`\n*   **Apply the Sigmoid Logit mapping (probability curve):**\n    `P(Pass) = 1 / (1 + e^-z)`\n    `P(Pass) = 1 / (1 + e^-2) = 1 / (1 + 0.1353) = 1 / 1.1353 = 0.88` or **88%**.\n*   **Minimum Target Hours required for a guaranteed 95% passing boundary:**\n    We want `P(z) = 0.95`:\n    `0.95 = 1 / (1 + e^-z) -> (1 + e^-z) = 1.0526 -> e^-z = 0.0526`\n    Taking the natural log of both sides:\n    `-z = ln(0.0526) = -2.94 -> z = 2.94`.\n    We substitute this into our original linear regression: `2.94 = -64 + 2 * (hours)`\n    `2 * (hours) = 66.94 -> hours = 33.47`.\n\nSteniha needs to study exactly **33.47 hours** to secure a statistically locked 95% passing guarantee! If she studies for 1 day (24 hours), she is still very close, but 33.47 hours is her mathematical sweet spot."
      }
    ]
  }
];
