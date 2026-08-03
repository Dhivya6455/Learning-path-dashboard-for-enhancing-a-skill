/* ==========================================================================
   LEARNING PATH DASHBOARD - CURRICULUM & QUESTION DATA
   ========================================================================== */

const APP_DATA = {
  skills: [
    {
      id: 'webdev',
      name: 'Web Development',
      icon: 'fa-code',
      level: 'Intermediate',
      badgeClass: 'badge-intermediate',
      description: 'Master HTML5, CSS3 Glassmorphism, JavaScript ES6+, DOM manipulation, and asynchronous programming.',
      totalTopics: 12,
      estimatedHours: '24 hrs'
    },
    {
      id: 'python',
      name: 'Python Programming',
      icon: 'fa-brands fa-python',
      level: 'Beginner',
      badgeClass: 'badge-beginner',
      description: 'Learn core syntax, data structures, OOP concepts, list comprehensions, and standard library modules.',
      totalTopics: 10,
      estimatedHours: '18 hrs'
    },
    {
      id: 'java',
      name: 'Java Fundamentals',
      icon: 'fa-brands fa-java',
      level: 'Intermediate',
      badgeClass: 'badge-intermediate',
      description: 'Understand object-oriented design patterns, JVM memory management, collections framework, and multithreading.',
      totalTopics: 14,
      estimatedHours: '30 hrs'
    },
    {
      id: 'datascience',
      name: 'Data Science & Analytics',
      icon: 'fa-chart-column',
      level: 'Intermediate',
      badgeClass: 'badge-intermediate',
      description: 'Master Pandas, NumPy array calculations, data cleaning, visualization, and exploratory analysis.',
      totalTopics: 12,
      estimatedHours: '28 hrs'
    },
    {
      id: 'ai',
      name: 'AI & Machine Learning',
      icon: 'fa-brain',
      level: 'Advanced',
      badgeClass: 'badge-advanced',
      description: 'Explore neural networks, supervised vs unsupervised learning, model evaluation, and prompt engineering.',
      totalTopics: 15,
      estimatedHours: '36 hrs'
    }
  ],

  // Diagnostic & Skill Quiz Questions (20 Multiple Choice Questions per Skill)
  quizzes: {
    webdev: [
      { id: 1, question: 'Which CSS property is required to achieve the background blur effect in Glassmorphism?', options: ['filter: blur(10px)', 'backdrop-filter: blur(10px)', 'background-blur: 10px', 'box-shadow: blur(10px)'], correct: 1, topic: 'CSS Modern Styling' },
      { id: 2, question: 'What is the output of `typeof NaN` in JavaScript?', options: ['"undefined"', '"null"', '"number"', '"NaN"'], correct: 2, topic: 'JavaScript Types & Coercion' },
      { id: 3, question: 'Which method returns a Promise that resolves when all of the input Promises resolve?', options: ['Promise.any()', 'Promise.race()', 'Promise.all()', 'Promise.allSettled()'], correct: 2, topic: 'Asynchronous JavaScript' },
      { id: 4, question: 'What does Event Delegation rely on in the DOM architecture?', options: ['Event Bubbling', 'Event Capturing only', 'Shadow DOM', 'CSS Selectors'], correct: 0, topic: 'DOM & Events' },
      { id: 5, question: 'Which HTML5 feature allows saving persistent key-value data across browser sessions?', options: ['sessionStorage', 'Cookies', 'localStorage', 'IndexedDB'], correct: 2, topic: 'Client State Storage' },
      { id: 6, question: 'Which HTTP method is idempotent and safe according to REST standards?', options: ['POST', 'GET', 'PATCH', 'CONNECT'], correct: 1, topic: 'HTTP & REST APIs' },
      { id: 7, question: 'What is the purpose of the `display: grid` property in modern CSS layout design?', options: ['Creates a 1D layout line', 'Creates a 2D grid structure with rows and columns', 'Centers inline text elements', 'Applies absolute positioning'], correct: 1, topic: 'CSS Grid & Flexbox' },
      { id: 8, question: 'What does the `async` keyword in JavaScript function declarations guarantee?', options: ['Function runs in a separate web worker', 'Function always returns a Promise', 'Function blocks main thread execution', 'Function executes before DOM load'], correct: 1, topic: 'Async JavaScript' },
      { id: 9, question: 'Which DOM method creates a new HTML element dynamically via script?', options: ['document.createElement()', 'document.appendChild()', 'document.makeElement()', 'document.newElement()'], correct: 0, topic: 'DOM Manipulation' },
      { id: 10, question: 'What does CSS `box-sizing: border-box` do?', options: ['Excludes padding from width', 'Includes padding and border in total element width/height', 'Removes element margins', 'Forces elements to behave like flex items'], correct: 1, topic: 'CSS Box Model' },
      { id: 11, question: 'Which operator checks both value and type equality in JavaScript?', options: ['==', '=', '===', '!='], correct: 2, topic: 'JS Operations' },
      { id: 12, question: 'What is a Closure in JavaScript software architecture?', options: ['A function bundled with references to its surrounding lexical environment', 'A method to close browser windows', 'A private class constructor', 'A method to free memory'], correct: 0, topic: 'JS Closures & Scope' },
      { id: 13, question: 'Which HTML5 semantic element is used to enclose main page content distinct from headers/footers?', options: ['<section>', '<main>', '<article>', '<div>'], correct: 1, topic: 'HTML5 Semantics' },
      { id: 14, question: 'How do you define CSS Custom Properties (Variables) at root scope?', options: ['@var name: val;', ':root { --name: val; }', '$name: val;', 'var name = val;'], correct: 1, topic: 'Modern CSS Variables' },
      { id: 15, question: 'What does `Array.prototype.map()` return in JavaScript?', options: ['A single mutated value', 'A new array populated with results of calling a function on every element', 'Boolean indicating match', 'Modifies original array in place'], correct: 1, topic: 'Array Functional Methods' },
      { id: 16, question: 'Which status code indicates a successful HTTP request with content returned?', options: ['200 OK', '201 Created', '304 Not Modified', '404 Not Found'], correct: 0, topic: 'HTTP Status Codes' },
      { id: 17, question: 'What is the purpose of ARIA attributes (`aria-label`, `aria-expanded`) in HTML design?', options: ['Increase SEO rank', 'Improve accessibility for assistive technologies', 'Add CSS styling rules', 'Accelerate page load speeds'], correct: 1, topic: 'Web Accessibility (a11y)' },
      { id: 18, question: 'Which keyword handles runtime exceptions in JavaScript `try...catch` blocks?', options: ['throw', 'catch', 'finally', 'except'], correct: 1, topic: 'JS Error Handling' },
      { id: 19, question: 'What is the Event Loop in JavaScript runtime execution?', options: ['A mechanism that monitors Call Stack and Callback Queue to execute async tasks', 'A loop that renders CSS animations', 'A database connection pool loop', 'A web worker thread loop'], correct: 0, topic: 'JS Event Loop' },
      { id: 20, question: 'Which CSS Flexbox property controls alignment along the main axis?', options: ['align-items', 'justify-content', 'align-content', 'flex-direction'], correct: 1, topic: 'CSS Flexbox Alignment' }
    ],

    python: [
      { id: 1, question: 'Which data structure in Python is mutable and ordered?', options: ['Tuple', 'Set', 'List', 'Frozenset'], correct: 2, topic: 'Python Data Structures' },
      { id: 2, question: 'What is the main benefit of using a Generator function with `yield` over returning a list?', options: ['Faster speed', 'Memory efficiency via lazy evaluation', 'Immutable output', 'Automatic thread safety'], correct: 1, topic: 'Generators & Memory' },
      { id: 3, question: 'How do you define a Decorator in Python?', options: ['A function that takes a class as input', 'A function that takes another function and extends its behavior', 'A special class constructor', 'A lambda expression'], correct: 1, topic: 'Advanced Decorators' },
      { id: 4, question: 'What is the keyword used to create an anonymous function in Python?', options: ['def', 'func', 'lambda', 'anonymous'], correct: 2, topic: 'Functional Programming' },
      { id: 5, question: 'Which module in Python standard library handles JSON serialization?', options: ['pickle', 'json', 'marshal', 'xml'], correct: 1, topic: 'Standard Library Modules' },
      { id: 6, question: 'What does the `__init__` method represent in Python classes?', options: ['Class destructor', 'Instance constructor initializer', 'Static method wrapper', 'Private variable decorator'], correct: 1, topic: 'Python Object-Oriented Design' },
      { id: 7, question: 'Which Python list comprehension syntax correctly filters even numbers from range(10)?', options: ['[x for x in range(10) if x % 2 == 0]', '[for x in range(10) if x % 2 == 0]', '[x if x % 2 == 0 for x in range(10)]', 'list(x % 2 == 0)'], correct: 0, topic: 'List Comprehensions' },
      { id: 8, question: 'What is the output of `bool([])` in Python?', options: ['True', 'False', 'None', 'Error'], correct: 1, topic: 'Python Truthiness & Types' },
      { id: 9, question: 'Which keyword is used to ensure clean-up code is always executed, like closing files?', options: ['finally', 'with', 'ensure', 'always'], correct: 0, topic: 'Exception Handling' },
      { id: 10, question: 'What statement opens a file using context management for automatic resource cleanup?', options: ['open file as f:', 'with open("file.txt") as f:', 'file.open()', 'try open("file.txt")'], correct: 1, topic: 'Context Managers & IO' },
      { id: 11, question: 'What is the key difference between a Tuple and a List in Python?', options: ['Tuples are mutable', 'Tuples are immutable', 'Lists cannot contain strings', 'Tuples do not support indexing'], correct: 1, topic: 'Tuples vs Lists' },
      { id: 12, question: 'Which dictionary method safely retrieves a value without throwing a KeyError if the key is missing?', options: ['dict.fetch()', 'dict.get(key, default)', 'dict.find()', 'dict.lookup()'], correct: 1, topic: 'Dictionary Operations' },
      { id: 13, question: 'What does `*args` pass into a Python function definition?', options: ['Arbitrary number of keyword arguments', 'Arbitrary number of positional arguments as a tuple', 'A pointer to memory', 'Required arguments list'], correct: 1, topic: 'Function Parameters' },
      { id: 14, question: 'Which module in Python is used for regular expression matching?', options: ['regex', 're', 'string', 'pyregex'], correct: 1, topic: 'Standard Modules' },
      { id: 15, question: 'What is the purpose of `self` inside Python instance methods?', options: ['Refers to the global scope', 'Refers to the current class instance', 'Refers to parent class', 'Keyword for static methods'], correct: 1, topic: 'Python OOP Mechanics' },
      { id: 16, question: 'What does `zip()` do in Python when given two lists `[1,2]` and `["a","b"]`?', options: ['Concatenates lists', 'Pairs elements into tuples `[(1,"a"), (2,"b")]`', 'Creates a nested matrix', 'Sorts lists in parallel'], correct: 1, topic: 'Built-in Utilities' },
      { id: 17, question: 'How do you achieve multiple inheritance in Python?', options: ['class Child(Base1, Base2):', 'class Child extends Base1, Base2:', 'class Child implements Base1, Base2:', 'Python does not support it'], correct: 0, topic: 'Inheritance & OOP' },
      { id: 18, question: 'What is the GIL (Global Interpreter Lock) in CPython?', options: ['Security lock for files', 'Mutex that allows only one thread to execute Python bytecode at a time', 'Garbage collection process', 'Database transaction lock'], correct: 1, topic: 'Concurrency & GIL' },
      { id: 19, question: 'Which operator performs integer (floor) division in Python?', options: ['/', '//', '%', '^'], correct: 1, topic: 'Python Operators' },
      { id: 20, question: 'Which built-in function returns an iterator of tuples containing (index, element)?', options: ['enumerate()', 'zip()', 'range()', 'index()'], correct: 0, topic: 'Iteration Tools' }
    ],

    java: [
      { id: 1, question: 'Which keyword prevents a class from being subclassed in Java?', options: ['static', 'abstract', 'final', 'sealed'], correct: 2, topic: 'Java OOP Principles' },
      { id: 2, question: 'Where are objects created dynamically stored in Java runtime memory?', options: ['Stack Memory', 'Heap Memory', 'Metaspace', 'Program Counter Register'], correct: 1, topic: 'JVM Memory Architecture' },
      { id: 3, question: 'Which Interface in Java Collections Framework does NOT allow duplicate elements?', options: ['List', 'Set', 'Queue', 'Map'], correct: 1, topic: 'Collections Framework' },
      { id: 4, question: 'What happens when a synchronized method is executing on an object?', options: ['Other threads can execute static methods only', 'A lock is acquired on the object monitor', 'Memory leak occurs', 'Garbage collection is suspended'], correct: 1, topic: 'Java Multithreading' },
      { id: 5, question: 'What is the default initial capacity of an ArrayList in Java 8+?', options: ['5', '10', '16', '32'], correct: 1, topic: 'Collections & Performance' },
      { id: 6, question: 'Which access modifier restricts visibility strictly to the defining class?', options: ['public', 'protected', 'default (package)', 'private'], correct: 3, topic: 'Access Control' },
      { id: 7, question: 'What is the difference between `String`, `StringBuilder`, and `StringBuffer` in Java?', options: ['String is mutable', 'StringBuilder is mutable and non-thread-safe; StringBuffer is thread-safe', 'StringBuffer is deprecated', 'All are identical'], correct: 1, topic: 'String Immutability & Thread Safety' },
      { id: 8, question: 'What exception is thrown when attempting to dereference a null object pointer?', options: ['IllegalArgumentException', 'NullPointerException', 'ClassNotFoundException', 'ArithmeticException'], correct: 1, topic: 'Java Exceptions' },
      { id: 9, question: 'Which method starts the execution of a thread in Java?', options: ['thread.run()', 'thread.start()', 'thread.execute()', 'thread.init()'], correct: 1, topic: 'Multithreading & Concurrency' },
      { id: 10, question: 'What feature introduced in Java 8 allows passing behavior as functional parameters?', options: ['Generics', 'Lambda Expressions', 'Reflection', 'Annotations'], correct: 1, topic: 'Java 8 Functional Features' },
      { id: 11, question: 'Which collection class implements a hash table data structure with constant-time O(1) lookup?', options: ['ArrayList', 'LinkedList', 'HashMap', 'TreeMap'], correct: 2, topic: 'Hash Data Structures' },
      { id: 12, question: 'What is the purpose of the `transient` keyword in Java class variable declarations?', options: ['Prevents variable from being serialized', 'Makes variable thread-safe', 'Prevents variable modification', 'Stores variable in Stack'], correct: 0, topic: 'Java Serialization' },
      { id: 13, question: 'Which method signature is mandatory for a Java application entry point?', options: ['public void main(String[] args)', 'public static void main(String[] args)', 'static void main(String args)', 'public int main()'], correct: 1, topic: 'JVM Entry Point' },
      { id: 14, question: 'What does Garbage Collection do in the JVM environment?', options: ['Deletes unreferenced objects from Heap memory automatically', 'Clears Stack frames', 'Compiles bytecode to native code', 'Validates security tokens'], correct: 0, topic: 'JVM Memory & GC' },
      { id: 15, question: 'Which interface must a class implement to enable custom object comparison using `Collections.sort()`?', options: ['Comparator', 'Comparable', 'Cloneable', 'Serializable'], correct: 1, topic: 'Object Comparison' },
      { id: 16, question: 'What is the superclass of all classes in Java object hierarchy?', options: ['java.lang.System', 'java.lang.Object', 'java.lang.Class', 'java.lang.Root'], correct: 1, topic: 'Java Class Hierarchy' },
      { id: 17, question: 'What is functional interface requirement in Java 8+?', options: ['Has no methods', 'Contains exactly one abstract method', 'Has only static methods', 'Extends Object class'], correct: 1, topic: 'Functional Interfaces' },
      { id: 18, question: 'Which stream terminal operation returns an `Optional` containing any element of the stream?', options: ['filter()', 'findAny()', 'map()', 'collect()'], correct: 1, topic: 'Java Streams API' },
      { id: 19, question: 'What is the effect of `try-with-resources` statement introduced in Java 7?', options: ['Automatically calls `close()` on AutoCloseable resources', 'Handles unchecked exceptions automatically', 'Accelerates IO speeds', 'Allocates resources in Metaspace'], correct: 0, topic: 'Resource Management' },
      { id: 20, question: 'Which design pattern is implemented by Spring Boot `@Autowired` dependency injection?', options: ['Factory Pattern', 'Inversion of Control (IoC) / Dependency Injection', 'Singleton Pattern', 'Observer Pattern'], correct: 1, topic: 'Spring & Design Patterns' }
    ],

    datascience: [
      { id: 1, question: 'Which Python library is primary for high-performance multi-dimensional array processing?', options: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'], correct: 1, topic: 'NumPy Arrays' },
      { id: 2, question: 'What is a Pandas DataFrame in data analytics?', options: ['A 1D labeled array', 'A 2D tabular data structure with labeled axes (rows and columns)', 'A graph database node', 'A binary file format'], correct: 1, topic: 'Pandas Foundations' },
      { id: 3, question: 'Which Pandas function is used to read CSV files into DataFrames?', options: ['pd.import_csv()', 'pd.read_csv()', 'pd.parse_csv()', 'pd.load_csv()'], correct: 1, topic: 'Data Ingestion' },
      { id: 4, question: 'What does `df.dropna()` do in Pandas data preprocessing?', options: ['Fills missing values with zeros', 'Removes rows or columns containing null/missing values', 'Sorts values by index', 'Resets DataFrame index'], correct: 1, topic: 'Data Cleaning' },
      { id: 5, question: 'Which plot is best suited to display distribution of a single numerical variable?', options: ['Scatter Plot', 'Bar Graph', 'Histogram', 'Line Chart'], correct: 2, topic: 'Data Visualization' },
      { id: 6, question: 'What metric measures the degree of linear association between two continuous variables?', options: ['Standard Deviation', 'Correlation Coefficient (Pearson r)', 'Variance', 'Median'], correct: 1, topic: 'Statistical Analysis' },
      { id: 7, question: 'What method in Pandas computes summary statistics (mean, std, min, max) for numeric columns?', options: ['df.summary()', 'df.describe()', 'df.info()', 'df.stats()'], correct: 1, topic: 'Exploratory Data Analysis' },
      { id: 8, question: 'What is the purpose of `groupby()` in Pandas data aggregation?', options: ['Sorts data by date', 'Splits data into groups based on criteria for aggregation (split-apply-combine)', 'Removes duplicate records', 'Joins two DataFrames'], correct: 1, topic: 'Data Aggregation' },
      { id: 9, question: 'Which library is standard for plotting interactive and static statistical charts in Python?', options: ['Seaborn / Matplotlib', 'NLTK', 'Flask', 'SQLAlchemy'], correct: 0, topic: 'Visualization Tools' },
      { id: 10, question: 'What does feature scaling (MinMax Scaling / Standardization) achieve in data preprocessing?', options: ['Removes outliers', 'Normalizes features to a uniform scale preventing dominance by large ranges', 'Converts text to categorical codes', 'Imputes missing values'], correct: 1, topic: 'Feature Preprocessing' },
      { id: 11, question: 'Which method handles missing data by replacing NaN values with mean/median?', options: ['df.fillna()', 'df.replace_null()', 'df.impute()', 'df.clean()'], correct: 0, topic: 'Data Imputation' },
      { id: 12, question: 'What is One-Hot Encoding used for in machine learning data pipelines?', options: ['Converting numerical data to text', 'Converting categorical variables into binary vectors', 'Compressing DataFrames', 'Encrypting sensitive fields'], correct: 1, topic: 'Categorical Encoding' },
      { id: 13, question: 'What does the median value represent in a dataset?', options: ['Sum divided by count', 'Middle value when dataset is sorted', 'Most frequently occurring value', 'Range between max and min'], correct: 1, topic: 'Descriptive Statistics' },
      { id: 14, question: 'Which SciPy module is designed for statistical hypothesis testing and distributions?', options: ['scipy.stats', 'scipy.optimize', 'scipy.integrate', 'scipy.linalg'], correct: 0, topic: 'Statistical Computing' },
      { id: 15, question: 'What does `df.merge()` accomplish in Pandas data manipulation?', options: ['Appends rows vertically', 'Joins DataFrames based on common keys (similar to SQL JOIN)', 'Combines duplicate columns', 'Exports data to database'], correct: 1, topic: 'Data Merging & Joins' },
      { id: 16, question: 'What is an Outlier in data analysis?', options: ['A missing value NaN', 'An observation point that lies an abnormal distance from other values', 'The mean value of a distribution', 'A duplicate row'], correct: 1, topic: 'Data Quality & Outliers' },
      { id: 17, question: 'Which NumPy method creates an array of evenly spaced numbers over a specified interval?', options: ['np.arange() / np.linspace()', 'np.array()', 'np.zeros()', 'np.full()'], correct: 0, topic: 'NumPy Generation' },
      { id: 18, question: 'What is the purpose of a Box Plot (Box-and-Whisker)?', options: ['Display trend over time', 'Visualize 5-number summary (min, Q1, median, Q3, max) and outliers', 'Display categorical frequency', 'Show 3D spatial points'], correct: 1, topic: 'Exploratory Visualization' },
      { id: 19, question: 'Which technique reduces dataset dimensionality while preserving maximum variance?', options: ['Principal Component Analysis (PCA)', 'K-Means Clustering', 'Linear Regression', 'Decision Tree'], correct: 0, topic: 'Dimensionality Reduction' },
      { id: 20, question: 'What does `df.pivot_table()` do in Pandas?', options: ['Rotates table axes and summarizes multi-dimensional data', 'Deletes empty columns', 'Exports to JSON', 'Converts array to Series'], correct: 0, topic: 'Pivot Tables & Reshaping' }
    ],

    ai: [
      { id: 1, question: 'Which loss function is commonly used for binary classification tasks in Neural Networks?', options: ['Mean Squared Error (MSE)', 'Binary Cross-Entropy', 'Categorical Cross-Entropy', 'Hinge Loss'], correct: 1, topic: 'Neural Network Loss Functions' },
      { id: 2, question: 'What problem does the ReLU activation function help mitigate compared to Sigmoid?', options: ['Exploding Gradients', 'Vanishing Gradients', 'Overfitting', 'Underfitting'], correct: 1, topic: 'Activation Functions' },
      { id: 3, question: 'In Transformer models, what mechanism allows capturing dependencies between tokens regardless of distance?', options: ['Recurrent Feedback', 'Self-Attention Mechanism', 'Convolutional Filtering', 'Pooling Layers'], correct: 1, topic: 'Transformer Architecture' },
      { id: 4, question: 'What metric evaluates a classifier when false positives are particularly costly?', options: ['Recall', 'Precision', 'Accuracy', 'F1-Score'], correct: 1, topic: 'Model Evaluation Metrics' },
      { id: 5, question: 'What is Overfitting in Machine Learning model evaluation?', options: ['Model performs poorly on training data', 'Model generalizes well to unseen data', 'Model learns noise in training data and fails to generalize to unseen test data', 'Model has high structural bias'], correct: 2, topic: 'Model Regularization' },
      { id: 6, question: 'Which optimization algorithm adapts learning rates for each parameter using first and second moments?', options: ['SGD with Momentum', 'Adam Optimizer', 'RMSprop', 'Adagrad'], correct: 1, topic: 'Deep Learning Optimizers' },
      { id: 7, question: 'What is the purpose of Softmax activation in the final layer of a multi-class neural network?', options: ['Converts outputs into a normalized probability distribution summing to 1', 'Clips values to [0, 1]', 'Computes gradient vectors', 'Applies L2 regularization'], correct: 0, topic: 'Classification Layers' },
      { id: 8, question: 'Which unsupervised learning technique partitions data into K distinct clusters based on distance to centroids?', options: ['K-Nearest Neighbors (KNN)', 'K-Means Clustering', 'Support Vector Machine', 'Random Forest'], correct: 1, topic: 'Unsupervised Clustering' },
      { id: 9, question: 'What technique randomly deactivates a fraction of neurons during training to prevent co-adaptation and overfitting?', options: ['Batch Normalization', 'Dropout', 'Weight Decay', 'Gradient Clipping'], correct: 1, topic: 'Regularization Techniques' },
      { id: 10, question: 'What does the Confusion Matrix present in model evaluation?', options: ['Graph of training loss over epochs', 'Table comparing True Positives, False Positives, True Negatives, and False Negatives', 'Vector of model weights', 'Learning rate curve'], correct: 1, topic: 'Evaluation Metrics' },
      { id: 11, question: 'Which architectural component in Convolutional Neural Networks (CNNs) reduces spatial dimensions?', options: ['Convolutional Layer', 'Pooling Layer (Max/Average Pooling)', 'Dense Layer', 'Softmax Layer'], correct: 1, topic: 'CNN Architectures' },
      { id: 12, question: 'What is Transfer Learning in modern Artificial Intelligence practice?', options: ['Transferring code to cloud servers', 'Reusing a pre-trained model on a new related task with fine-tuning', 'Converting PyTorch models to TensorFlow', 'Transferring weights to CPU'], correct: 1, topic: 'Deep Learning Techniques' },
      { id: 13, question: 'Which trade-off describes balancing model simplicity (high bias) against model sensitivity to noise (high variance)?', options: ['Bias-Variance Trade-off', 'Precision-Recall Curve', 'AUC-ROC Trade-off', 'Explosion-Vanishing Dilemma'], correct: 0, topic: 'ML Generalization Theory' },
      { id: 14, question: 'What mechanism in Transformers injects token position information into embeddings?', options: ['Self-Attention', 'Positional Encoding', 'Multi-Head Attention', 'Layer Normalization'], correct: 1, topic: 'LLM & Transformer Architecture' },
      { id: 15, question: 'What metric evaluates continuous output predictions in regression models?', options: ['Cross-Entropy', 'Mean Absolute Error (MAE) / Root Mean Squared Error (RMSE)', 'Accuracy Score', 'ROC-AUC'], correct: 1, topic: 'Regression Evaluation' },
      { id: 16, question: 'Which technique combines predictions from multiple weak base models (e.g. Decision Trees) to form a strong predictor?', options: ['Ensemble Learning (Random Forests, Gradient Boosting)', 'Linear Discriminant Analysis', 'Single Perceptron', 'Principal Component Analysis'], correct: 0, topic: 'Ensemble Learning' },
      { id: 17, question: 'What is Backpropagation in Neural Network training?', options: ['Forward pass calculation', 'Algorithm for calculating gradients of loss function with respect to weights using chain rule', 'Initializing random weights', 'Exporting model checkpoint'], correct: 1, topic: 'Neural Network Optimization' },
      { id: 18, question: 'Which metric measures model sensitivity (ability to identify all true positive instances)?', options: ['Precision', 'Recall (Sensitivity)', 'Accuracy', 'Specificity'], correct: 1, topic: 'Model Evaluation' },
      { id: 19, question: 'What parameter controls the step size taken during gradient descent optimization?', options: ['Batch Size', 'Learning Rate', 'Epoch Count', 'Momentum Factor'], correct: 1, topic: 'Hyperparameter Tuning' },
      { id: 20, question: 'What technique uses human feedback to align large language model outputs with human intent?', options: ['Reinforcement Learning from Human Feedback (RLHF)', 'Supervised Pre-training', 'Greedy Decoding', 'Top-K Sampling'], correct: 0, topic: 'AI Alignment & LLMs' }
    ]
  },

  // Final Proctored Certification Exam Questions (20 Multiple Choice Questions)
  finalExam: [
    { id: 101, question: 'Which CSS property is required to achieve background blur in Glassmorphism?', options: ['filter: blur(10px)', 'backdrop-filter: blur(10px)', 'background-blur: 10px', 'box-shadow: blur(10px)'], correct: 1, topic: 'Web Styling & CSS3' },
    { id: 102, question: 'What is the output of `typeof NaN` in JavaScript?', options: ['"undefined"', '"null"', '"number"', '"NaN"'], correct: 2, topic: 'JS Fundamentals' },
    { id: 103, question: 'Which method returns a Promise that resolves when all input promises resolve successfully?', options: ['Promise.any()', 'Promise.race()', 'Promise.all()', 'Promise.allSettled()'], correct: 2, topic: 'Asynchronous JavaScript' },
    { id: 104, question: 'What does DOM Event Delegation rely on in modern browser event handling?', options: ['Event Bubbling', 'Event Capturing only', 'Shadow DOM', 'CSS Selectors'], correct: 0, topic: 'DOM Architecture' },
    { id: 105, question: 'Which HTML5 API allows saving persistent state in client browsers across sessions?', options: ['sessionStorage', 'Cookies', 'localStorage', 'IndexedDB'], correct: 2, topic: 'Client State Management' },
    { id: 106, question: 'Which Java interface in the Collections Framework does NOT allow duplicate elements?', options: ['List', 'Set', 'Queue', 'Map'], correct: 1, topic: 'Java Collections Framework' },
    { id: 107, question: 'Where are dynamically instantiated objects stored in Java runtime memory execution?', options: ['Stack Memory', 'Heap Memory', 'Metaspace', 'Program Counter Register'], correct: 1, topic: 'JVM Memory Architecture' },
    { id: 108, question: 'Which Java keyword prevents a class from being inherited or subclassed?', options: ['static', 'abstract', 'final', 'sealed'], correct: 2, topic: 'Java OOP Principles' },
    { id: 109, question: 'What occurs when a synchronized block/method is executed on an object in Java?', options: ['Other threads can access static methods only', 'A lock is acquired on the object monitor', 'Memory leak occurs immediately', 'Garbage collection is suspended'], correct: 1, topic: 'Java Multithreading' },
    { id: 110, question: 'What is the default initial capacity of an ArrayList in Java 8+ when elements are added?', options: ['5', '10', '16', '32'], correct: 1, topic: 'Java Data Structures' },
    { id: 111, question: 'Which Python data structure is ordered, indexed, and mutable?', options: ['Tuple', 'Set', 'List', 'Frozenset'], correct: 2, topic: 'Python Data Structures' },
    { id: 112, question: 'What is the primary benefit of using a Python Generator function with `yield`?', options: ['Faster execution speed', 'Memory efficiency via lazy evaluation', 'Immutable output array', 'Automatic thread locks'], correct: 1, topic: 'Python Memory & Generators' },
    { id: 113, question: 'How is a Decorator function defined in Python software design?', options: ['A function that takes a class as input', 'A function that takes another function and extends its behavior', 'A special class constructor', 'A lambda expression'], correct: 1, topic: 'Advanced Python Concepts' },
    { id: 114, question: 'Which built-in Python module is standard for parsing and serializing JSON data?', options: ['pickle', 'json', 'marshal', 'xml'], correct: 1, topic: 'Python Standard Library' },
    { id: 115, question: 'What keyword is used to declare an anonymous single-expression function in Python?', options: ['def', 'func', 'lambda', 'anonymous'], correct: 2, topic: 'Python Functional Design' },
    { id: 116, question: 'Which loss function is standard for binary classification tasks in Neural Networks?', options: ['Mean Squared Error (MSE)', 'Binary Cross-Entropy', 'Categorical Cross-Entropy', 'Hinge Loss'], correct: 1, topic: 'Neural Network Architecture' },
    { id: 117, question: 'What problem does the ReLU activation function solve compared to the Sigmoid function?', options: ['Exploding Gradients', 'Vanishing Gradients', 'Data Overfitting', 'Data Underfitting'], correct: 1, topic: 'Deep Learning Activation' },
    { id: 118, question: 'In Transformer models, what mechanism captures token relationships regardless of distance?', options: ['Recurrent Feedback', 'Self-Attention Mechanism', 'Convolutional Filtering', 'Pooling Layers'], correct: 1, topic: 'Transformer Architecture' },
    { id: 119, question: 'Which metric is most critical to evaluate when false positives carry a high penalty?', options: ['Recall', 'Precision', 'Accuracy', 'F1-Score'], correct: 1, topic: 'Machine Learning Evaluation' },
    { id: 120, question: 'What does Overfitting represent in machine learning model evaluation?', options: ['Model performs poorly on training data', 'Model generalizes perfectly to unseen data', 'Model learns training noise and fails on unseen test data', 'Model has high structural bias'], correct: 2, topic: 'Model Generalization' }
  ],

  // Detailed Topic-Wise Course Lessons & Subtopics per Skill Track
  courseLessons: {
    webdev: [
      {
        id: 'wd_les1',
        title: 'Lesson 1: HTML5 Semantics & Accessibility Architecture',
        duration: '20 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        videoUrl: 'https://www.youtube.com/embed/UB1O30fR-EE',
        videoWatchUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
        videoTitle: 'HTML5 Semantic Markup & Modern Accessibility',
        subtopics: [
          { id: 'wd_1_sub1', title: 'Semantic HTML5 structure elements (<main>, <article>, <header>)' },
          { id: 'wd_1_sub2', title: 'ARIA Roles, Attributes & Screen Reader Accessibility' },
          { id: 'wd_1_sub3', title: 'Client-side HTML5 Form Validation & Inputs' }
        ],
        notes: `
          <p>Master clean structural HTML markup for modern web applications.</p>
          <h4 style="margin-top:12px; margin-bottom:6px; color:var(--primary);">Key Subtopics:</h4>
          <ul>
            <li>Using semantic tags to build accessible document outlines.</li>
            <li>Implementing ARIA labels for dynamic interactive elements.</li>
          </ul>
        `,
        resources: [
          { name: 'MDN HTML5 Specification Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' }
        ]
      },
      {
        id: 'wd_les2',
        title: 'Lesson 2: CSS3 Glassmorphism UI & Flexbox/Grid Mastery',
        duration: '25 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        videoUrl: 'https://www.youtube.com/embed/1Rs2ND1ryYc',
        videoWatchUrl: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc',
        videoTitle: 'CSS Grid, Flexbox Layouts & Glassmorphism Design',
        subtopics: [
          { id: 'wd_2_sub1', title: 'Backdrop-filter blur & Glassmorphism Card System' },
          { id: 'wd_2_sub2', title: 'CSS Grid Template Columns & 2D Layout Alignment' },
          { id: 'wd_2_sub3', title: 'Flexbox Alignment (justify-content & align-items)' }
        ],
        notes: `<p>Design modern responsive glassmorphism UI layouts with pure CSS.</p>`,
        resources: [
          { name: 'CSS Tricks Flexbox & Grid Guide', url: 'https://css-tricks.com/' }
        ]
      },
      {
        id: 'wd_les3',
        title: 'Lesson 3: Modern JavaScript ES6+ & Asynchronous Fetch API',
        duration: '30 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        videoUrl: 'https://www.youtube.com/embed/PoRJizFvM7s',
        videoWatchUrl: 'https://www.youtube.com/watch?v=PoRJizFvM7s',
        videoTitle: 'Asynchronous JavaScript: Promises & Async/Await',
        subtopics: [
          { id: 'wd_3_sub1', title: 'JavaScript Promises & Async/Await syntax' },
          { id: 'wd_3_sub2', title: 'Fetch API HTTP Requests & REST Endpoint Integration' },
          { id: 'wd_3_sub3', title: 'Try...Catch Error Handling & Exception Management' }
        ],
        notes: `<p>Handle asynchronous network requests and REST APIs seamlessly in client JS.</p>`,
        resources: [
          { name: 'JavaScript.info Async Tutorial', url: 'https://javascript.info/async' }
        ]
      },
      {
        id: 'wd_les4',
        title: 'Lesson 4: DOM Architecture, State & Final Assessment Prep',
        duration: '20 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        videoUrl: 'https://www.youtube.com/embed/y17RuWkWdn8',
        videoWatchUrl: 'https://www.youtube.com/watch?v=y17RuWkWdn8',
        videoTitle: 'DOM Manipulation & LocalStorage Persistence',
        subtopics: [
          { id: 'wd_4_sub1', title: 'DOM Event Delegation & Bubbling Architecture' },
          { id: 'wd_4_sub2', title: 'Client State Storage via LocalStorage API' },
          { id: 'wd_4_sub3', title: 'Proctored Final Exam Preparation & Review' }
        ],
        notes: `<p>Complete all subtopics above to unlock your Final Certification Exam.</p>`,
        resources: [
          { name: 'Web Dev Best Practices', url: 'https://web.dev/' }
        ]
      }
    ],

    python: [
      {
        id: 'py_les1',
        title: 'Lesson 1: Python Core Syntax & Data Structures',
        duration: '20 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
        videoWatchUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
        videoTitle: 'Python Data Structures & Fundamental Operations',
        subtopics: [
          { id: 'py_1_sub1', title: 'Lists, Tuples, Dictionaries & Set operations' },
          { id: 'py_1_sub2', title: 'List Comprehensions & Conditional Filtering' },
          { id: 'py_1_sub3', title: 'Control Flow (If/else conditions & Loops)' }
        ],
        notes: '<p>Master Python core structures and memory-efficient comprehensions.</p>',
        resources: [{ name: 'Python Official Docs', url: 'https://docs.python.org/3/' }]
      },
      {
        id: 'py_les2',
        title: 'Lesson 2: Python Object-Oriented Programming (OOP)',
        duration: '25 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        videoUrl: 'https://www.youtube.com/embed/Jeznw_jak5w',
        videoWatchUrl: 'https://www.youtube.com/watch?v=Jeznw_jak5w',
        videoTitle: 'Python Classes, Objects & Inheritance',
        subtopics: [
          { id: 'py_2_sub1', title: 'Classes, Instances, and `__init__` constructor' },
          { id: 'py_2_sub2', title: 'Inheritance, Method Overriding & Dunder Methods' },
          { id: 'py_2_sub3', title: 'Encapsulation & Private Attribute Conventions' }
        ],
        notes: '<p>Build robust object-oriented software applications in Python.</p>',
        resources: [{ name: 'Real Python OOP Guide', url: 'https://realpython.com/' }]
      },
      {
        id: 'py_les3',
        title: 'Lesson 3: Generators, Decorators & Context Managers',
        duration: '30 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
        videoWatchUrl: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
        videoTitle: 'Advanced Python: Decorators & Generator Functions',
        subtopics: [
          { id: 'py_3_sub1', title: 'Yield keyword & Lazy Evaluation Generators' },
          { id: 'py_3_sub2', title: 'Custom Function Decorators & `@wraps`' },
          { id: 'py_3_sub3', title: 'With statements & Custom Context Managers' }
        ],
        notes: '<p>Optimize memory consumption with Python generators and decorators.</p>',
        resources: [{ name: 'Advanced Python Cheatsheet', url: 'https://devdocs.io/' }]
      },
      {
        id: 'py_les4',
        title: 'Lesson 4: Python Standard Modules & Assessment Preparation',
        duration: '20 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        videoUrl: 'https://www.youtube.com/embed/HGOBQPFzWKo',
        videoWatchUrl: 'https://www.youtube.com/watch?v=HGOBQPFzWKo',
        videoTitle: 'Standard Library Modules & Final Exam Review',
        subtopics: [
          { id: 'py_4_sub1', title: 'JSON Serialization (`json` module)' },
          { id: 'py_4_sub2', title: 'Regular Expressions & Pattern Matching (`re` module)' },
          { id: 'py_4_sub3', title: 'Final Certification Exam Readiness Check' }
        ],
        notes: '<p>Finish all Python subtopics to unlock your certification exam.</p>',
        resources: [{ name: 'Launch Python Final Exam', url: 'quiz.html?skill=python&type=exam' }]
      }
    ],

    java: [
      {
        id: 'jv_les1',
        title: 'Lesson 1: Java OOP Principles & Syntax Foundations',
        duration: '25 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34',
        videoWatchUrl: 'https://www.youtube.com/watch?v=eIrMbAQSU34',
        videoTitle: 'Java Syntax, OOP Principles & Access Modifiers',
        subtopics: [
          { id: 'jv_1_sub1', title: 'Classes, Objects, Methods & Constructors' },
          { id: 'jv_1_sub2', title: 'Keywords: `final`, `static`, `abstract`' },
          { id: 'jv_1_sub3', title: 'Access Control (public, private, protected)' }
        ],
        notes: '<p>Learn core Java programming fundamentals and OOP architecture.</p>',
        resources: [{ name: 'Oracle Java Documentation', url: 'https://docs.oracle.com/en/java/' }]
      },
      {
        id: 'jv_les2',
        title: 'Lesson 2: Java Collections Framework Mastery',
        duration: '30 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        videoUrl: 'https://www.youtube.com/embed/grEKMHGYyns',
        videoWatchUrl: 'https://www.youtube.com/watch?v=grEKMHGYyns',
        videoTitle: 'Java Collections: ArrayList, HashSet, HashMap',
        subtopics: [
          { id: 'jv_2_sub1', title: 'List Interface (ArrayList vs LinkedList)' },
          { id: 'jv_2_sub2', title: 'Set & Map Interfaces (HashSet & HashMap mechanics)' },
          { id: 'jv_2_sub3', title: 'Sorting Collections with `Comparable` & `Comparator`' }
        ],
        notes: '<p>Master high-performance data structures in Java.</p>',
        resources: [{ name: 'Baeldung Java Collections', url: 'https://www.baeldung.com/' }]
      },
      {
        id: 'jv_les3',
        title: 'Lesson 3: JVM Memory Architecture & Multithreading',
        duration: '35 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        videoUrl: 'https://www.youtube.com/embed/A74TOX803D0',
        videoWatchUrl: 'https://www.youtube.com/watch?v=A74TOX803D0',
        videoTitle: 'JVM Memory (Heap/Stack) & Synchronized Multithreading',
        subtopics: [
          { id: 'jv_3_sub1', title: 'Heap vs Stack Memory Allocation & Garbage Collection' },
          { id: 'jv_3_sub2', title: 'Thread Creation & `synchronized` Monitor Locks' },
          { id: 'jv_3_sub3', title: 'Java 8 Streams API & Lambda Expressions' }
        ],
        notes: '<p>Understand JVM runtime memory management and multithreaded concurrency.</p>',
        resources: [{ name: 'Java Multithreading Guide', url: 'https://www.baeldung.com/java-concurrency' }]
      },
      {
        id: 'jv_les4',
        title: 'Lesson 4: Resource Management & Final Exam Review',
        duration: '20 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        videoUrl: 'https://www.youtube.com/embed/xk4_1vDrRew',
        videoWatchUrl: 'https://www.youtube.com/watch?v=xk4_1vDrRew',
        videoTitle: 'Java Try-With-Resources & Certification Review',
        subtopics: [
          { id: 'jv_4_sub1', title: 'Try-with-resources & AutoCloseable exception handling' },
          { id: 'jv_4_sub2', title: 'Spring Boot Dependency Injection & IoC Concepts' },
          { id: 'jv_4_sub3', title: 'Final Certification Exam Readiness Check' }
        ],
        notes: '<p>Finish all Java subtopics to unlock your final certification exam.</p>',
        resources: [{ name: 'Launch Java Final Exam', url: 'quiz.html?skill=java&type=exam' }]
      }
    ],

    datascience: [
      {
        id: 'ds_les1',
        title: 'Lesson 1: Pandas DataFrames & Data Ingestion',
        duration: '25 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj3U',
        videoWatchUrl: 'https://www.youtube.com/watch?v=ua-CiDNNj3U',
        videoTitle: 'Pandas Tutorial: DataFrames & CSV Parsing',
        subtopics: [
          { id: 'ds_1_sub1', title: 'Reading & Parsing CSV files with `pd.read_csv()`' },
          { id: 'ds_1_sub2', title: 'DataFrame Indexing, Selecting & Filtering Rows' },
          { id: 'ds_1_sub3', title: 'Summary Statistics with `df.describe()`' }
        ],
        notes: '<p>Master tabular data manipulation and ingestion with Pandas.</p>',
        resources: [{ name: 'Pandas Official Documentation', url: 'https://pandas.pydata.org/' }]
      },
      {
        id: 'ds_les2',
        title: 'Lesson 2: NumPy Array Operations & Mathematical Computing',
        duration: '25 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        videoUrl: 'https://www.youtube.com/embed/GPVsHOlRBBI',
        videoWatchUrl: 'https://www.youtube.com/watch?v=GPVsHOlRBBI',
        videoTitle: 'NumPy Arrays & Vectorized Calculations',
        subtopics: [
          { id: 'ds_2_sub1', title: 'N-Dimensional NumPy Arrays & Broadcasting' },
          { id: 'ds_2_sub2', title: 'Matrix Multiplication & Element-wise Operations' },
          { id: 'ds_2_sub3', title: 'Handling Missing Data (`df.dropna()`, `df.fillna()`)' }
        ],
        notes: '<p>Perform high-performance vector calculations with NumPy.</p>',
        resources: [{ name: 'NumPy Quickstart', url: 'https://numpy.org/' }]
      },
      {
        id: 'ds_les3',
        title: 'Lesson 3: Exploratory Data Visualization & Aggregations',
        duration: '30 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        videoUrl: 'https://www.youtube.com/embed/r-uOLxNk8Uo',
        videoWatchUrl: 'https://www.youtube.com/watch?v=r-uOLxNk8Uo',
        videoTitle: 'Data Visualization & GroupBy Aggregation',
        subtopics: [
          { id: 'ds_3_sub1', title: 'Data Aggregations with `groupby()` & Pivot Tables' },
          { id: 'ds_3_sub2', title: 'Plotting Histograms, Scatter Plots & Box Plots' },
          { id: 'ds_3_sub3', title: 'Correlation Coefficients & Outlier Detection' }
        ],
        notes: '<p>Gain actionable insights through statistical data visualization.</p>',
        resources: [{ name: 'Seaborn Tutorial', url: 'https://seaborn.pydata.org/' }]
      },
      {
        id: 'ds_les4',
        title: 'Lesson 4: Feature Preprocessing & Final Exam Prep',
        duration: '20 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        videoUrl: 'https://www.youtube.com/embed/vmEHCJofslg',
        videoWatchUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg',
        videoTitle: 'Data Cleaning, One-Hot Encoding & Exam Review',
        subtopics: [
          { id: 'ds_4_sub1', title: 'Feature Scaling & One-Hot Encoding' },
          { id: 'ds_4_sub2', title: 'Data Merging & SQL-style Joins in Pandas' },
          { id: 'ds_4_sub3', title: 'Data Science Final Certification Readiness' }
        ],
        notes: '<p>Finish all Data Science subtopics to unlock your final certification exam.</p>',
        resources: [{ name: 'Launch Data Science Final Exam', url: 'quiz.html?skill=datascience&type=exam' }]
      }
    ],

    ai: [
      {
        id: 'ai_les1',
        title: 'Lesson 1: Foundations of Machine Learning & Neural Networks',
        duration: '25 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
        videoWatchUrl: 'https://www.youtube.com/watch?v=aircAruvnKk',
        videoTitle: 'Neural Networks & Deep Learning Foundations',
        subtopics: [
          { id: 'ai_1_sub1', title: 'Supervised vs Unsupervised Machine Learning' },
          { id: 'ai_1_sub2', title: 'Perceptrons, Dense Layers & Weight Initialization' },
          { id: 'ai_1_sub3', title: 'Activation Functions (ReLU, Sigmoid, Softmax)' }
        ],
        notes: '<p>Build foundational understanding of neural network architectures.</p>',
        resources: [{ name: '3Blue1Brown Neural Networks', url: 'https://www.3blue1brown.com/' }]
      },
      {
        id: 'ai_les2',
        title: 'Lesson 2: Optimization, Loss Functions & Backpropagation',
        duration: '30 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        videoUrl: 'https://www.youtube.com/embed/i_LwzRVP7bg',
        videoWatchUrl: 'https://www.youtube.com/watch?v=i_LwzRVP7bg',
        videoTitle: 'Gradient Descent, Loss Functions & Adam Optimizer',
        subtopics: [
          { id: 'ai_2_sub1', title: 'Loss Functions (Binary & Categorical Cross-Entropy)' },
          { id: 'ai_2_sub2', title: 'Backpropagation & Gradient Descent Optimization' },
          { id: 'ai_2_sub3', title: 'Mitigating Vanishing & Exploding Gradients' }
        ],
        notes: '<p>Train deep models using gradient descent optimization algorithms.</p>',
        resources: [{ name: 'PyTorch Tutorials', url: 'https://pytorch.org/tutorials/' }]
      },
      {
        id: 'ai_les3',
        title: 'Lesson 3: Transformers, Self-Attention & LLM Architectures',
        duration: '35 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        videoUrl: 'https://www.youtube.com/embed/JMUxmLyrhSk',
        videoWatchUrl: 'https://www.youtube.com/watch?v=JMUxmLyrhSk',
        videoTitle: 'Transformer Architecture & Self-Attention Mechanism',
        subtopics: [
          { id: 'ai_3_sub1', title: 'Self-Attention Mechanism & Multi-Head Attention' },
          { id: 'ai_3_sub2', title: 'Positional Encoding & Layer Normalization' },
          { id: 'ai_3_sub3', title: 'Fine-tuning Large Language Models & RLHF' }
        ],
        notes: '<p>Understand modern Transformer and Large Language Model architectures.</p>',
        resources: [{ name: 'Hugging Face Transformers Guide', url: 'https://huggingface.co/docs' }]
      },
      {
        id: 'ai_les4',
        title: 'Lesson 4: Model Evaluation, Regularization & Exam Prep',
        duration: '20 mins',
        mp4Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        videoUrl: 'https://www.youtube.com/embed/b99UVkWzYTQ',
        videoWatchUrl: 'https://www.youtube.com/watch?v=b99UVkWzYTQ',
        videoTitle: 'Precision, Recall, Dropout & Final Assessment Prep',
        subtopics: [
          { id: 'ai_4_sub1', title: 'Precision, Recall, F1-Score & Confusion Matrix' },
          { id: 'ai_4_sub2', title: 'Overfitting Prevention with Dropout & Weight Decay' },
          { id: 'ai_4_sub3', title: 'Proctored AI Final Certification Readiness' }
        ],
        notes: '<p>Finish all AI subtopics to unlock your final certification exam.</p>',
        resources: [{ name: 'Launch AI Final Exam', url: 'quiz.html?skill=ai&type=exam' }]
      }
    ]
  }
};

// Fallback mapping for default skill lessons
APP_DATA.courseLessons.default = APP_DATA.courseLessons.webdev;
