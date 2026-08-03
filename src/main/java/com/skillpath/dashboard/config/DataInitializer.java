package com.skillpath.dashboard.config;

import com.skillpath.dashboard.model.*;
import com.skillpath.dashboard.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final TopicRepository topicRepository;

    public DataInitializer(UserRepository userRepository, 
                           SkillRepository skillRepository, 
                           QuizQuestionRepository quizQuestionRepository,
                           TopicRepository topicRepository) {
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
        this.quizQuestionRepository = quizQuestionRepository;
        this.topicRepository = topicRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Skills Catalog
        if (skillRepository.count() == 0) {
            skillRepository.save(new Skill("webdev", "Web Development", "fa-code", "Intermediate", "badge-intermediate", "Master HTML5, CSS3 Glassmorphism, JavaScript ES6+, DOM manipulation, and async programming.", 12, "24 hrs"));
            skillRepository.save(new Skill("python", "Python Programming", "fa-brands fa-python", "Beginner", "badge-beginner", "Learn core syntax, data structures, OOP concepts, list comprehensions, and modules.", 10, "18 hrs"));
            skillRepository.save(new Skill("java", "Java Fundamentals", "fa-brands fa-java", "Intermediate", "badge-intermediate", "Understand OOP design patterns, JVM memory management, collections, and multithreading.", 14, "30 hrs"));
            skillRepository.save(new Skill("datascience", "Data Science & Analytics", "fa-chart-column", "Intermediate", "badge-intermediate", "Master Data manipulation with Pandas, NumPy, Data Visualization, and Exploratory Data Analysis.", 12, "28 hrs"));
            skillRepository.save(new Skill("ai", "AI & Machine Learning", "fa-brain", "Advanced", "badge-advanced", "Explore neural networks, supervised vs unsupervised learning, model evaluation, and LLMs.", 15, "36 hrs"));
        }

        // 2. Seed Diagnostic Quiz Questions (10-12 Questions Per Track)
        if (quizQuestionRepository.count() < 30) {
            quizQuestionRepository.deleteAll();

            // ==================== WEB DEVELOPMENT (10 Questions) ====================
            quizQuestionRepository.save(new QuizQuestion("webdev", "Which CSS property is required to achieve the background blur effect in Glassmorphism?", "filter: blur(10px)", "backdrop-filter: blur(10px)", "background-blur: 10px", "box-shadow: blur(10px)", 1, "CSS Glassmorphism & Effects", false));
            quizQuestionRepository.save(new QuizQuestion("webdev", "What is the output of `typeof NaN` in JavaScript?", "\"undefined\"", "\"null\"", "\"number\"", "\"NaN\"", 2, "JavaScript Types & Coercion", false));
            quizQuestionRepository.save(new QuizQuestion("webdev", "Which method returns a Promise that resolves when all input Promises resolve?", "Promise.any()", "Promise.race()", "Promise.all()", "Promise.allSettled()", 2, "Asynchronous JavaScript", false));
            quizQuestionRepository.save(new QuizQuestion("webdev", "What does Event Delegation rely on in the DOM architecture?", "Event Bubbling", "Event Capturing only", "Shadow DOM", "CSS Selectors", 0, "DOM Events & Manipulation", false));
            quizQuestionRepository.save(new QuizQuestion("webdev", "Which HTML5 API allows saving persistent state across browser sessions on the client side?", "sessionStorage", "Cookies", "localStorage", "IndexedDB", 2, "Client State Management", false));
            quizQuestionRepository.save(new QuizQuestion("webdev", "Which CSS layout method is two-dimensional (handling both rows and columns simultaneously)?", "Flexbox", "CSS Grid", "Float layout", "Position absolute", 1, "Modern CSS Layouts", false));
            quizQuestionRepository.save(new QuizQuestion("webdev", "What is the difference between `let` and `var` in JavaScript?", "`let` is function-scoped", "`let` is block-scoped and non-hoisted", "`var` is block-scoped", "`let` cannot be reassigned", 1, "JavaScript Variables & Scope", false));
            quizQuestionRepository.save(new QuizQuestion("webdev", "Which HTTP status code signifies a Successful POST Resource Creation?", "200 OK", "201 Created", "204 No Content", "302 Found", 1, "REST API Architecture", false));
            quizQuestionRepository.save(new QuizQuestion("webdev", "What does the JavaScript `spread` operator (`...`) do when applied to arrays?", "Concatenates array length", "Expands elements into individual elements", "Flattens nested arrays", "Reverses array element order", 1, "ES6 Syntax Features", false));
            quizQuestionRepository.save(new QuizQuestion("webdev", "Which HTML tag is used to specify semantic main page navigation?", "<nav>", "<header>", "<section>", "<aside>", 0, "HTML5 Semantic Structure", false));

            // ==================== PYTHON PROGRAMMING (10 Questions) ====================
            quizQuestionRepository.save(new QuizQuestion("python", "Which data structure in Python is mutable, ordered, and allows duplicates?", "Tuple", "Set", "List", "Frozenset", 2, "Python Core Data Structures", false));
            quizQuestionRepository.save(new QuizQuestion("python", "What is the main benefit of using a Generator function with `yield` over returning a list?", "Faster CPU speed", "Memory efficiency via lazy evaluation", "Immutable output values", "Automatic multithreading", 1, "Generators & Memory", false));
            quizQuestionRepository.save(new QuizQuestion("python", "How do you define a Decorator in Python?", "Function taking a class argument", "Function taking another function to wrap its execution", "Constructor method", "Lambda closure", 1, "Python Decorators", false));
            quizQuestionRepository.save(new QuizQuestion("python", "What is the output of `len({1, 2, 2, 3})` in Python?", "4", "3", "2", "TypeError", 1, "Sets & Immutability", false));
            quizQuestionRepository.save(new QuizQuestion("python", "Which built-in module in Python is used for regular expressions?", "regex", "re", "pyregex", "string", 1, "Python Standard Library", false));
            quizQuestionRepository.save(new QuizQuestion("python", "What is the purpose of `__init__` method in Python classes?", "Destroys instance objects", "Initializes class attributes when an object is instantiated", "Compiles class bytecode", "Imports external modules", 1, "Object-Oriented Python", false));
            quizQuestionRepository.save(new QuizQuestion("python", "How does Python handle Exception Handling?", "try-catch-finally", "try-except-finally", "do-catch-finally", "begin-rescue-ensure", 1, "Exception Handling", false));
            quizQuestionRepository.save(new QuizQuestion("python", "What does List Comprehension `[x**2 for x in range(5) if x%2==0]` produce?", "[0, 1, 4, 9, 16]", "[0, 4, 16]", "[1, 9]", "[4, 16]", 1, "List Comprehensions", false));
            quizQuestionRepository.save(new QuizQuestion("python", "Which keyword is used to pass variable-length key-value arguments to a Python function?", "*args", "**kwargs", "varargs", "params", 1, "Functions & Arguments", false));
            quizQuestionRepository.save(new QuizQuestion("python", "What is GIL in standard CPython implementation?", "Global Internal Compiler", "Global Interpreter Lock preventing multi-thread execution", "General Interface Layer", "Garbage Line Inspector", 1, "Concurrency & Architecture", false));

            // ==================== JAVA FUNDAMENTALS (10 Questions) ====================
            quizQuestionRepository.save(new QuizQuestion("java", "Which keyword prevents a class from being subclassed in Java?", "static", "abstract", "final", "sealed", 2, "Java OOP Principles", false));
            quizQuestionRepository.save(new QuizQuestion("java", "Where are dynamically instantiated objects stored in Java runtime memory?", "Stack Memory", "Heap Memory", "Metaspace", "Program Counter Register", 1, "JVM Memory Architecture", false));
            quizQuestionRepository.save(new QuizQuestion("java", "Which Interface in Java Collections Framework does NOT allow duplicate elements?", "List", "Set", "Queue", "Map", 1, "Collections Framework", false));
            quizQuestionRepository.save(new QuizQuestion("java", "What is the default initial capacity of an `ArrayList` in Java?", "5", "10", "16", "32", 1, "Collections & Performance", false));
            quizQuestionRepository.save(new QuizQuestion("java", "Which Spring annotation marks a class as a REST Controller returning JSON?", "@Controller", "@RestController", "@Service", "@Repository", 1, "Spring Boot Framework", false));
            quizQuestionRepository.save(new QuizQuestion("java", "What is the key difference between Checked and Unchecked Exceptions in Java?", "Checked exceptions inherit Exception class directly and require handling", "Unchecked exceptions are checked at compile time", "Checked exceptions occur only in JVM garbage collection", "Unchecked exceptions cannot be caught", 0, "Exception Handling Mechanics", false));
            quizQuestionRepository.save(new QuizQuestion("java", "Which method is used to launch a new Thread execution in Java?", "thread.run()", "thread.start()", "thread.execute()", "thread.begin()", 1, "Multithreading & Concurrency", false));
            quizQuestionRepository.save(new QuizQuestion("java", "What is the purpose of `volatile` keyword in Java?", "Makes variable immutable", "Guarantees thread visibility by writing directly to main memory", "Prevents garbage collection", "Serializes the variable", 1, "Concurrency & Memory Visibility", false));
            quizQuestionRepository.save(new QuizQuestion("java", "Which Java feature introduced in Java 8 allows functional-style operations on collections?", "Generics", "Streams API", "Modules System", "Records", 1, "Java 8+ Functional Features", false));
            quizQuestionRepository.save(new QuizQuestion("java", "In JPA / Hibernate, which annotation marks a field as a primary key?", "@Key", "@Id", "@PrimaryKey", "@Column(key=true)", 1, "JPA & ORM Mapping", false));

            // ==================== DATA SCIENCE (10 Questions) ====================
            quizQuestionRepository.save(new QuizQuestion("datascience", "Which Python library is primarily used for multi-dimensional array processing and mathematical computations?", "Pandas", "NumPy", "Matplotlib", "Scikit-Learn", 1, "Numerical Computation", false));
            quizQuestionRepository.save(new QuizQuestion("datascience", "What is the main purpose of Pandas `DataFrame.dropna()` method?", "Fills missing values with zero", "Removes rows or columns containing missing values", "Replaces NaN with mean", "Sorts dataframe index", 1, "Data Cleaning & Preprocessing", false));
            quizQuestionRepository.save(new QuizQuestion("datascience", "Which plot is best suited for visualizing the distribution of a continuous numerical variable?", "Bar plot", "Pie chart", "Histogram / Boxplot", "Line plot", 2, "Exploratory Data Analysis", false));
            quizQuestionRepository.save(new QuizQuestion("datascience", "What does Correlation Coefficient of -0.9 indicate between two numerical variables?", "Weak positive correlation", "Strong negative linear relationship", "No relationship", "Categorical dependence", 1, "Statistical Analysis", false));
            quizQuestionRepository.save(new QuizQuestion("datascience", "Which method in Pandas is used to merge two DataFrames on a common column key?", "pd.concat()", "pd.merge()", "pd.join_all()", "pd.append()", 1, "Data Manipulation & Merging", false));
            quizQuestionRepository.save(new QuizQuestion("datascience", "What is Feature Scaling in machine learning data preparation?", "Reducing number of features", "Standardizing numeric range of feature columns (e.g. MinMax, Z-score)", "Removing categorical columns", "Encoding string labels", 1, "Feature Engineering", false));
            quizQuestionRepository.save(new QuizQuestion("datascience", "Which metric evaluates regression model performance by taking average squared difference?", "Accuracy Score", "Mean Squared Error (MSE)", "Precision Score", "F1 Score", 1, "Model Evaluation Metrics", false));
            quizQuestionRepository.save(new QuizQuestion("datascience", "What is the function of `groupby()` in Pandas DataFrames?", "Splits data into groups for aggregation calculations", "Filters out duplicate rows", "Reshapes matrix dimensions", "Sorts DataFrame alphabetically", 0, "Data Aggregation & Grouping", false));
            quizQuestionRepository.save(new QuizQuestion("datascience", "Which visualization library is built on top of Matplotlib and offers high-level statistical graphics?", "Bokeh", "Seaborn", "Plotly", "Dash", 1, "Data Visualization Libraries", false));
            quizQuestionRepository.save(new QuizQuestion("datascience", "What is Outlier detection in Data Science dataset analysis?", "Finding duplicate data rows", "Identifying data points significantly distant from remaining observations", "Filling missing values", "Calculating percentile range", 1, "Outlier Analysis & Cleaning", false));

            // ==================== AI & MACHINE LEARNING (10 Questions) ====================
            quizQuestionRepository.save(new QuizQuestion("ai", "Which loss function is commonly used for binary classification in Neural Networks?", "Mean Squared Error (MSE)", "Binary Cross-Entropy", "Categorical Cross-Entropy", "Hinge Loss", 1, "Neural Network Loss Functions", false));
            quizQuestionRepository.save(new QuizQuestion("ai", "What problem does the ReLU activation function help mitigate compared to Sigmoid?", "Exploding Gradients", "Vanishing Gradients", "Overfitting", "Underfitting", 1, "Activation Functions", false));
            quizQuestionRepository.save(new QuizQuestion("ai", "Which learning paradigm relies on unlabelled data to find hidden clusters or structures?", "Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Semi-supervised Learning", 1, "Machine Learning Paradigms", false));
            quizQuestionRepository.save(new QuizQuestion("ai", "What does Overfitting mean in machine learning model training?", "Model performs poorly on both training and test data", "Model learns training noise and performs poorly on unseen test data", "Model converges too slowly", "Dataset has too few feature columns", 1, "Model Generalization & Regularization", false));
            quizQuestionRepository.save(new QuizQuestion("ai", "Which ensemble learning technique combines multiple weak Decision Trees trained in parallel?", "Gradient Boosting", "Random Forest (Bagging)", "Linear Discriminant Analysis", "K-Means Clustering", 1, "Ensemble Methods", false));
            quizQuestionRepository.save(new QuizQuestion("ai", "What does the Attention Mechanism in Transformer models allow?", "Processing tokens sequentially line-by-line", "Weighing influence of distinct input tokens regardless of distance", "Reducing GPU memory usage to zero", "Eliminating loss functions", 1, "Deep Learning Architecture & LLMs", false));
            quizQuestionRepository.save(new QuizQuestion("ai", "In Classification model evaluation, what is Precision?", "Ratio of True Positives to total actual positives", "Ratio of True Positives to total predicted positives", "Overall correct accuracy ratio", "Area under ROC curve", 1, "Classification Metrics", false));
            quizQuestionRepository.save(new QuizQuestion("ai", "What is Gradient Descent used for in Machine Learning?", "Generating synthetic datasets", "Optimizing model weights to minimize the cost/loss function", "Encoding categorical variables", "Splitting train-test datasets", 1, "Optimization Algorithms", false));
            quizQuestionRepository.save(new QuizQuestion("ai", "Which algorithm is commonly used for unsupervised clustering?", "Logistic Regression", "K-Means Clustering", "Support Vector Machines", "Naive Bayes", 1, "Clustering Algorithms", false));
            quizQuestionRepository.save(new QuizQuestion("ai", "What is the purpose of Dropout in Deep Neural Networks?", "Prevents neural network overfitting by randomly disabling nodes during training", "Increases learning rate automatically", "Deletes useless dataset columns", "Accelerates matrix multiplication", 0, "Neural Network Regularization", false));

            // ==================== FINAL PROCTORED EXAM QUESTIONS ====================
            quizQuestionRepository.save(new QuizQuestion("all", "Which glassmorphism property combines backdrop blur with translucent background color?", "backdrop-filter: blur() with background: rgba()", "box-shadow with border-radius", "filter: drop-shadow()", "opacity: 0.5 with overflow: hidden", 0, "Glassmorphism UI", true));
            quizQuestionRepository.save(new QuizQuestion("all", "What is the primary function of localStorage in web browser environments?", "To send HTTP cookies automatically", "To store key-value data with no expiration time", "To store temporary session data", "To execute web worker scripts", 1, "Client State Storage", true));
            quizQuestionRepository.save(new QuizQuestion("all", "In AI model evaluation, what does an ROC-AUC score of 1.0 indicate?", "Random classifier performance", "Perfect classification capability", "Complete model overfitting", "High mean squared error", 1, "Model Evaluation Metrics", true));
            quizQuestionRepository.save(new QuizQuestion("all", "What is the minimum passing score percentage required to earn a Certificate of Completion?", "50%", "60%", "75%", "85%", 2, "Certification Policy", true));
        }

        // 3. Seed Roadmap Topics
        if (topicRepository.count() == 0) {
            topicRepository.save(new Topic("wd_1", "webdev", "BEGINNER", "HTML5 Semantic Markup & Accessibility", "2 hours", "Semantic tags, ARIA attributes, Form validation"));
            topicRepository.save(new Topic("wd_2", "webdev", "BEGINNER", "Modern CSS Grid & Flexbox Mastery", "3 hours", "Flexbox alignment, CSS Grid templates, Responsive design"));
            topicRepository.save(new Topic("wd_3", "webdev", "INTERMEDIATE", "Glassmorphism UI & Modern CSS Variables", "4 hours", "CSS Custom Properties, Backdrop-filter blur, Soft shadows"));
            topicRepository.save(new Topic("wd_4", "webdev", "INTERMEDIATE", "Asynchronous JavaScript & Fetch API", "5 hours", "Promises, Async/Await, Fetch API, Error handling"));
            topicRepository.save(new Topic("wd_5", "webdev", "ADVANCED", "State Management & LocalStorage Persistence", "4 hours", "LocalStorage API, JSON parsing, SPA Routing"));

            topicRepository.save(new Topic("jv_1", "java", "BEGINNER", "Java Syntax, Types & OOP Concepts", "3 hours", "Classes, Objects, Constructors, Interfaces, Encapsulation"));
            topicRepository.save(new Topic("jv_2", "java", "INTERMEDIATE", "Java Collections Framework", "4 hours", "ArrayList vs LinkedList, HashMap mechanics, Comparators"));
            topicRepository.save(new Topic("jv_3", "java", "ADVANCED", "JVM Memory & Multithreading", "6 hours", "Heap vs Stack, Garbage Collection, Synchronization"));

            topicRepository.save(new Topic("py_1", "python", "BEGINNER", "Python Syntax & Core Data Structures", "3 hours", "Lists, Tuples, Dictionaries, Sets, Functions"));
            topicRepository.save(new Topic("py_2", "python", "INTERMEDIATE", "Object-Oriented Python & Decorators", "4 hours", "Classes, Inheritance, Dunder Methods, Decorators"));
            topicRepository.save(new Topic("py_3", "python", "ADVANCED", "Generators, Iterators & Memory Optimization", "5 hours", "Yield, Iterators, CPython GIL, Multiprocessing"));

            topicRepository.save(new Topic("ds_1", "datascience", "BEGINNER", "NumPy & Pandas Data Wrangling", "4 hours", "Arrays, DataFrames, Indexing, Data Cleaning"));
            topicRepository.save(new Topic("ds_2", "datascience", "INTERMEDIATE", "Exploratory Data Analysis & Visualization", "5 hours", "Matplotlib, Seaborn, Feature Scaling, Outliers"));
            topicRepository.save(new Topic("ds_3", "datascience", "ADVANCED", "Statistical Modeling & Machine Learning Intro", "6 hours", "Regression, Classification, Cross-Validation"));
        }
    }
}
