-- ===================================================================
-- SEED DATA FOR LEARNING PATH DASHBOARD (H2 & MySQL)
-- ===================================================================

-- 1. Skills Catalog Data
INSERT INTO skills (id, name, icon, difficulty_level, badge_class, description, total_topics, estimated_hours) VALUES
('webdev', 'Web Development', 'fa-code', 'Intermediate', 'badge-intermediate', 'Master HTML5, CSS3 Glassmorphic UI, JavaScript ES6+, DOM manipulation, and Async programming.', 12, '24 hrs'),
('python', 'Python Programming', 'fa-brands fa-python', 'Beginner', 'badge-beginner', 'Learn core syntax, data structures, OOP, list comprehensions, decorators, and generators.', 10, '18 hrs'),
('java', 'Java Fundamentals', 'fa-brands fa-java', 'Intermediate', 'badge-intermediate', 'Understand OOP principles, JVM memory architecture, Collections framework, and multithreading.', 14, '30 hrs'),
('datascience', 'Data Science & Analytics', 'fa-chart-column', 'Intermediate', 'badge-intermediate', 'Master Pandas, NumPy array calculations, data cleaning, visualization, and exploratory analysis.', 12, '28 hrs'),
('ai', 'AI & Machine Learning', 'fa-brain', 'Advanced', 'badge-advanced', 'Explore neural networks, loss functions, activation functions, transformers, and model metrics.', 15, '36 hrs');

-- 2. Final Exam Questions (20 Multiple Choice Questions)
INSERT INTO quiz_questions (skill_id, question_text, option_a, option_b, option_c, option_d, correct_option, topic_category, is_final_exam) VALUES
('all', 'Which CSS property achieves background blur effect required for Glassmorphism UI?', 'filter: blur(10px)', 'backdrop-filter: blur(10px)', 'background-blur: 10px', 'box-shadow: blur(10px)', 1, 'Web Styling & CSS3', TRUE),
('all', 'What is the output of `typeof NaN` in JavaScript?', 'undefined', 'null', 'number', 'NaN', 2, 'JS Fundamentals', TRUE),
('all', 'Which method returns a Promise that resolves when all input promises resolve successfully?', 'Promise.any()', 'Promise.race()', 'Promise.all()', 'Promise.allSettled()', 2, 'Asynchronous JavaScript', TRUE),
('all', 'What does DOM Event Delegation rely on in modern browser event handling?', 'Event Bubbling', 'Event Capturing only', 'Shadow DOM', 'CSS Selectors', 0, 'DOM Architecture', TRUE),
('all', 'Which HTML5 API allows saving persistent state in client browsers across sessions?', 'sessionStorage', 'Cookies', 'localStorage', 'IndexedDB', 2, 'Client State Management', TRUE),
('all', 'Which Java interface in the Collections Framework does NOT allow duplicate elements?', 'List', 'Set', 'Queue', 'Map', 1, 'Java Collections Framework', TRUE),
('all', 'Where are dynamically instantiated objects stored in Java runtime memory execution?', 'Stack Memory', 'Heap Memory', 'Metaspace', 'Program Counter Register', 1, 'JVM Memory Architecture', TRUE),
('all', 'Which Java keyword prevents a class from being inherited or subclassed?', 'static', 'abstract', 'final', 'sealed', 2, 'Java OOP Principles', TRUE),
('all', 'What occurs when a synchronized block/method is executed on an object in Java?', 'Other threads can access static methods only', 'A lock is acquired on the object monitor', 'Memory leak occurs immediately', 'Garbage collection is suspended', 1, 'Java Multithreading', TRUE),
('all', 'What is the default initial capacity of an ArrayList in Java 8+ when elements are added?', '5', '10', '16', '32', 1, 'Java Data Structures', TRUE),
('all', 'Which Python data structure is ordered, indexed, and mutable?', 'Tuple', 'Set', 'List', 'Frozenset', 2, 'Python Data Structures', TRUE),
('all', 'What is the primary benefit of using a Python Generator function with `yield`?', 'Faster execution speed', 'Memory efficiency via lazy evaluation', 'Immutable output array', 'Automatic thread locks', 1, 'Python Memory & Generators', TRUE),
('all', 'How is a Decorator function defined in Python software design?', 'A function that takes a class as input', 'A function that takes another function and extends its behavior', 'A special class constructor', 'A lambda expression', 1, 'Advanced Python Concepts', TRUE),
('all', 'Which built-in Python module is standard for parsing and serializing JSON data?', 'pickle', 'json', 'marshal', 'xml', 1, 'Python Standard Library', TRUE),
('all', 'What keyword is used to declare an anonymous single-expression function in Python?', 'def', 'func', 'lambda', 'anonymous', 2, 'Python Functional Design', TRUE),
('all', 'Which loss function is standard for binary classification tasks in Neural Networks?', 'Mean Squared Error (MSE)', 'Binary Cross-Entropy', 'Categorical Cross-Entropy', 'Hinge Loss', 1, 'Neural Network Architecture', TRUE),
('all', 'What problem does the ReLU activation function solve compared to the Sigmoid function?', 'Exploding Gradients', 'Vanishing Gradients', 'Data Overfitting', 'Data Underfitting', 1, 'Deep Learning Activation', TRUE),
('all', 'In Transformer models, what mechanism captures token relationships regardless of distance?', 'Recurrent Feedback', 'Self-Attention Mechanism', 'Convolutional Filtering', 'Pooling Layers', 1, 'Transformer Architecture', TRUE),
('all', 'Which metric is most critical to evaluate when false positives carry a high penalty?', 'Recall', 'Precision', 'Accuracy', 'F1-Score', 1, 'Machine Learning Evaluation', TRUE),
('all', 'What does Overfitting represent in machine learning model evaluation?', 'Model performs poorly on training data', 'Model generalizes perfectly to unseen data', 'Model learns training noise and fails on unseen test data', 'Model has high structural bias', 2, 'Model Generalization', TRUE);

-- 3. Diagnostic Questions per Skill
INSERT INTO quiz_questions (skill_id, question_text, option_a, option_b, option_c, option_d, correct_option, topic_category, is_final_exam) VALUES
('webdev', 'Which CSS property enables Glassmorphism background blur?', 'filter', 'backdrop-filter', 'background-blur', 'box-shadow', 1, 'CSS Modern Styling', FALSE),
('webdev', 'What type is returned by `typeof NaN`?', 'undefined', 'null', 'number', 'NaN', 2, 'JavaScript Types', FALSE),
('webdev', 'Which Promise method waits for all promises to resolve?', 'Promise.any', 'Promise.race', 'Promise.all', 'Promise.settled', 2, 'Asynchronous JS', FALSE),
('java', 'Which collection type prevents duplicate values in Java?', 'ArrayList', 'HashSet', 'LinkedList', 'Vector', 1, 'Java Collections', FALSE),
('java', 'Where are Java objects stored in memory?', 'Stack', 'Heap', 'Method Area', 'PC Register', 1, 'JVM Memory', FALSE),
('python', 'Which Python sequence type is mutable?', 'Tuple', 'String', 'List', 'Bytes', 2, 'Python Data Types', FALSE),
('python', 'Which keyword creates a generator in Python?', 'return', 'yield', 'emit', 'generate', 1, 'Python Generators', FALSE),
('ai', 'Which loss function is used for binary neural network classification?', 'MSE', 'Binary Cross-Entropy', 'Hinge', 'MAE', 1, 'Loss Functions', FALSE);
