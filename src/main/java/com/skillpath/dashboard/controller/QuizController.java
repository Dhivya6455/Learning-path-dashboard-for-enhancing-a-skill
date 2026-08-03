package com.skillpath.dashboard.controller;

import com.skillpath.dashboard.dto.AssessmentResultResponse;
import com.skillpath.dashboard.dto.QuizSubmissionRequest;
import com.skillpath.dashboard.model.QuizQuestion;
import com.skillpath.dashboard.service.QuizService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "*")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/{skillId}")
    public List<QuizQuestion> getDiagnosticQuestions(@PathVariable String skillId) {
        return quizService.getQuestionsForSkill(skillId, false);
    }

    @GetMapping("/final-exam")
    public List<QuizQuestion> getFinalExamQuestions() {
        return quizService.getQuestionsForSkill("all", true);
    }

    @PostMapping("/submit")
    public AssessmentResultResponse submitQuiz(@RequestBody QuizSubmissionRequest request) {
        return quizService.evaluateSubmission(request);
    }
}
