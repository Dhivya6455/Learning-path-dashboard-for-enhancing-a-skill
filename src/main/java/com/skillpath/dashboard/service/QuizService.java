package com.skillpath.dashboard.service;

import com.skillpath.dashboard.dto.AssessmentResultResponse;
import com.skillpath.dashboard.dto.QuizSubmissionRequest;
import com.skillpath.dashboard.model.Certificate;
import com.skillpath.dashboard.model.QuizAttempt;
import com.skillpath.dashboard.model.QuizQuestion;
import com.skillpath.dashboard.repository.CertificateRepository;
import com.skillpath.dashboard.repository.QuizAttemptRepository;
import com.skillpath.dashboard.repository.QuizQuestionRepository;
import com.skillpath.dashboard.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
public class QuizService {

    private final QuizQuestionRepository quizQuestionRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final CertificateRepository certificateRepository;
    private final UserRepository userRepository;
    private final AuthService authService;

    public QuizService(QuizQuestionRepository quizQuestionRepository,
                       QuizAttemptRepository quizAttemptRepository,
                       CertificateRepository certificateRepository,
                       UserRepository userRepository,
                       AuthService authService) {
        this.quizQuestionRepository = quizQuestionRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.certificateRepository = certificateRepository;
        this.userRepository = userRepository;
        this.authService = authService;
    }

    public List<QuizQuestion> getQuestionsForSkill(String skillId, boolean isFinalExam) {
        if (isFinalExam) {
            List<QuizQuestion> list = quizQuestionRepository.findByIsFinalExamTrue();
            if (list != null && list.size() >= 20) {
                return list;
            }
            return getFallbackFinalExamQuestions();
        }
        return quizQuestionRepository.findBySkillIdAndIsFinalExamFalse(skillId);
    }

    public AssessmentResultResponse evaluateSubmission(QuizSubmissionRequest request) {
        List<QuizQuestion> questions = getQuestionsForSkill(request.getSkillId(), request.isFinalExam());
        List<Integer> answers = request.getUserAnswers();

        int correctCount = 0;
        Set<String> weakTopicsSet = new LinkedHashSet<>();
        Set<String> strongTopicsSet = new LinkedHashSet<>();

        for (int i = 0; i < questions.size(); i++) {
            QuizQuestion q = questions.get(i);
            Integer userAns = (i < answers.size()) ? answers.get(i) : null;

            if (userAns != null && userAns == q.getCorrectOption()) {
                correctCount++;
                strongTopicsSet.add(q.getTopicCategory());
            } else {
                weakTopicsSet.add(q.getTopicCategory());
            }
        }

        int total = questions.isEmpty() ? 1 : questions.size();
        int scorePct = Math.round(((float) correctCount / total) * 100);
        boolean passed = scorePct >= 75;

        List<String> weakTopics = new ArrayList<>(weakTopicsSet);
        List<String> strongTopics = new ArrayList<>(strongTopicsSet);

        // If no weak topics identified (100% score), suggest advanced mastery topics
        if (weakTopics.isEmpty()) {
            weakTopics.add("Advanced Architecture & Optimization");
        }

        // Generate tailored course recommendations based on weak areas & skill
        List<String> recommendedCourses = generateCourseRecommendations(request.getSkillId(), weakTopics);

        String weakStr = String.join(", ", weakTopics);
        String strongStr = String.join(", ", strongTopics);
        String recsStr = String.join(" | ", recommendedCourses);

        // Save Attempt Record in QuizAttempt Table
        QuizAttempt attempt = new QuizAttempt(
            request.getUserId(),
            request.getSkillId(),
            scorePct,
            weakStr,
            strongStr,
            request.isFinalExam(),
            passed
        );
        quizAttemptRepository.save(attempt);

        // Save Assessment Results & set hasCompletedAssessment = true in User record
        if (request.getUserId() != null) {
            try {
                authService.updateAssessmentResults(request.getUserId(), request.getSkillId(), scorePct, weakStr, recsStr);
            } catch (Exception e) {
                System.err.println("Could not update user assessment state: " + e.getMessage());
            }
        }

        AssessmentResultResponse response = new AssessmentResultResponse();
        response.setScorePercentage(scorePct);
        response.setCorrectCount(correctCount);
        response.setTotalQuestions(questions.size());
        response.setWeakTopics(weakTopics);
        response.setStrongTopics(strongTopics);
        response.setRecommendedCourses(recommendedCourses);
        response.setPassed(passed);
        response.setRecommendationMessage(
            passed ? "Excellent performance! You have demonstrated strong understanding."
                   : "Diagnostic evaluation complete. Review your recommended learning path below to strengthen weak areas."
        );

        // Generate Certificate if Final Exam Passed
        if (request.isFinalExam() && passed && request.getUserId() != null) {
            String certCode = "CERT-2026-" + (int)(1000 + Math.random() * 9000);
            String userName = userRepository.findById(request.getUserId()).map(u -> u.getFullName()).orElse("Learner");
            String skillTitle = getSkillTitle(request.getSkillId());
            Certificate cert = new Certificate(certCode, request.getUserId(), userName, skillTitle, scorePct, LocalDate.now());
            certificateRepository.save(cert);
            response.setCertificateCode(certCode);
        }

        return response;
    }

    private List<String> generateCourseRecommendations(String skillId, List<String> weakTopics) {
        List<String> courses = new ArrayList<>();

        for (String topic : weakTopics) {
            courses.add("Mastering " + topic + " - Targeted Deep Dive");
        }

        if (skillId == null) skillId = "webdev";

        switch (skillId.toLowerCase()) {
            case "java":
                courses.add("Java 17 & Spring Boot Microservices Fundamentals");
                courses.add("Effective Java: Design Patterns & Multithreading");
                break;
            case "python":
                courses.add("Python for Modern Software Engineering & Data Analysis");
                courses.add("Advanced Python OOP & Memory Optimization");
                break;
            case "datascience":
                courses.add("Data Science Bootcamp: Pandas, NumPy & Machine Learning");
                courses.add("Statistical Analysis & Data Visualization with Python");
                break;
            case "ai":
                courses.add("Deep Learning Specialization & Neural Networks");
                courses.add("Applied Machine Learning & Model Evaluation");
                break;
            case "webdev":
            default:
                courses.add("Full-Stack Web Development with Modern JavaScript");
                courses.add("Responsive CSS3 Glassmorphism & UI Design System");
                break;
        }

        return courses;
    }

    private String getSkillTitle(String skillId) {
        if (skillId == null) return "Web Development";
        switch (skillId.toLowerCase()) {
            case "java": return "Java Fundamentals";
            case "python": return "Python Programming";
            case "ai": return "AI & Machine Learning";
            case "datascience": return "Data Science & Analytics";
            case "webdev":
            default: return "Web Development";
        }
    }

    private List<QuizQuestion> getFallbackFinalExamQuestions() {
        List<QuizQuestion> list = new ArrayList<>();
        list.add(new QuizQuestion("all", "Which CSS property achieves background blur effect required for Glassmorphism UI?", "filter: blur(10px)", "backdrop-filter: blur(10px)", "background-blur: 10px", "box-shadow: blur(10px)", 1, "Web Styling & CSS3", true));
        list.add(new QuizQuestion("all", "What is the output of `typeof NaN` in JavaScript?", "undefined", "null", "number", "NaN", 2, "JS Fundamentals", true));
        list.add(new QuizQuestion("all", "Which method returns a Promise that resolves when all input promises resolve successfully?", "Promise.any()", "Promise.race()", "Promise.all()", "Promise.allSettled()", 2, "Asynchronous JavaScript", true));
        list.add(new QuizQuestion("all", "What does DOM Event Delegation rely on in modern browser event handling?", "Event Bubbling", "Event Capturing only", "Shadow DOM", "CSS Selectors", 0, "DOM Architecture", true));
        list.add(new QuizQuestion("all", "Which HTML5 API allows saving persistent state in client browsers across sessions?", "sessionStorage", "Cookies", "localStorage", "IndexedDB", 2, "Client State Management", true));
        list.add(new QuizQuestion("all", "Which Java interface in the Collections Framework does NOT allow duplicate elements?", "List", "Set", "Queue", "Map", 1, "Java Collections Framework", true));
        list.add(new QuizQuestion("all", "Where are dynamically instantiated objects stored in Java runtime memory execution?", "Stack Memory", "Heap Memory", "Metaspace", "Program Counter Register", 1, "JVM Memory Architecture", true));
        list.add(new QuizQuestion("all", "Which Java keyword prevents a class from being inherited or subclassed?", "static", "abstract", "final", "sealed", 2, "Java OOP Principles", true));
        list.add(new QuizQuestion("all", "What occurs when a synchronized block/method is executed on an object in Java?", "Other threads can access static methods only", "A lock is acquired on the object monitor", "Memory leak occurs immediately", "Garbage collection is suspended", 1, "Java Multithreading", true));
        list.add(new QuizQuestion("all", "What is the default initial capacity of an ArrayList in Java 8+ when elements are added?", "5", "10", "16", "32", 1, "Java Data Structures", true));
        list.add(new QuizQuestion("all", "Which Python data structure is ordered, indexed, and mutable?", "Tuple", "Set", "List", "Frozenset", 2, "Python Data Structures", true));
        list.add(new QuizQuestion("all", "What is the primary benefit of using a Python Generator function with `yield`?", "Faster execution speed", "Memory efficiency via lazy evaluation", "Immutable output array", "Automatic thread locks", 1, "Python Memory & Generators", true));
        list.add(new QuizQuestion("all", "How is a Decorator function defined in Python software design?", "A function that takes a class as input", "A function that takes another function and extends its behavior", "A special class constructor", "A lambda expression", 1, "Advanced Python Concepts", true));
        list.add(new QuizQuestion("all", "Which built-in Python module is standard for parsing and serializing JSON data?", "pickle", "json", "marshal", "xml", 1, "Python Standard Library", true));
        list.add(new QuizQuestion("all", "What keyword is used to declare an anonymous single-expression function in Python?", "def", "func", "lambda", "anonymous", 2, "Python Functional Design", true));
        list.add(new QuizQuestion("all", "Which loss function is standard for binary classification tasks in Neural Networks?", "Mean Squared Error (MSE)", "Binary Cross-Entropy", "Categorical Cross-Entropy", "Hinge Loss", 1, "Neural Network Architecture", true));
        list.add(new QuizQuestion("all", "What problem does the ReLU activation function solve compared to the Sigmoid function?", "Exploding Gradients", "Vanishing Gradients", "Data Overfitting", "Data Underfitting", 1, "Deep Learning Activation", true));
        list.add(new QuizQuestion("all", "In Transformer models, what mechanism captures token relationships regardless of distance?", "Recurrent Feedback", "Self-Attention Mechanism", "Convolutional Filtering", "Pooling Layers", 1, "Transformer Architecture", true));
        list.add(new QuizQuestion("all", "Which metric is most critical to evaluate when false positives carry a high penalty?", "Recall", "Precision", "Accuracy", "F1-Score", 1, "Machine Learning Evaluation", true));
        list.add(new QuizQuestion("all", "What does Overfitting represent in machine learning model evaluation?", "Model performs poorly on training data", "Model generalizes perfectly to unseen data", "Model learns training noise and fails on unseen test data", "Model has high structural bias", 2, "Model Generalization", true));
        return list;
    }
}
