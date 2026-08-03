package com.skillpath.dashboard.dto;

import java.util.List;

public class AssessmentResultResponse {
    private int scorePercentage;
    private int correctCount;
    private int totalQuestions;
    private List<String> weakTopics;
    private List<String> strongTopics;
    private List<String> recommendedCourses;
    private String recommendationMessage;
    private boolean passed;
    private String certificateCode;

    public AssessmentResultResponse() {}

    public int getScorePercentage() { return scorePercentage; }
    public void setScorePercentage(int scorePercentage) { this.scorePercentage = scorePercentage; }

    public int getCorrectCount() { return correctCount; }
    public void setCorrectCount(int correctCount) { this.correctCount = correctCount; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }

    public List<String> getWeakTopics() { return weakTopics; }
    public void setWeakTopics(List<String> weakTopics) { this.weakTopics = weakTopics; }

    public List<String> getStrongTopics() { return strongTopics; }
    public void setStrongTopics(List<String> strongTopics) { this.strongTopics = strongTopics; }

    public List<String> getRecommendedCourses() { return recommendedCourses; }
    public void setRecommendedCourses(List<String> recommendedCourses) { this.recommendedCourses = recommendedCourses; }

    public String getRecommendationMessage() { return recommendationMessage; }
    public void setRecommendationMessage(String recommendationMessage) { this.recommendationMessage = recommendationMessage; }

    public boolean isPassed() { return passed; }
    public void setPassed(boolean passed) { this.passed = passed; }

    public String getCertificateCode() { return certificateCode; }
    public void setCertificateCode(String certificateCode) { this.certificateCode = certificateCode; }
}
