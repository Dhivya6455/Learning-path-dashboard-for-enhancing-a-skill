package com.skillpath.dashboard.dto;

import java.util.List;

public class QuizSubmissionRequest {
    private Long userId;
    private String skillId;
    private List<Integer> userAnswers; // List of chosen option indices (0, 1, 2, 3)
    private boolean isFinalExam;

    public QuizSubmissionRequest() {}

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getSkillId() { return skillId; }
    public void setSkillId(String skillId) { this.skillId = skillId; }

    public List<Integer> getUserAnswers() { return userAnswers; }
    public void setUserAnswers(List<Integer> userAnswers) { this.userAnswers = userAnswers; }

    public boolean isFinalExam() { return isFinalExam; }
    public void setFinalExam(boolean finalExam) { isFinalExam = finalExam; }
}
