package com.skillpath.dashboard.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_attempts")
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "skill_id", nullable = false)
    private String skillId;

    @Column(name = "score_percentage", nullable = false)
    private int scorePercentage;
    
    @Column(name = "weak_topics", length = 2000)
    private String weakTopics;

    @Column(name = "strong_topics", length = 2000)
    private String strongTopics;

    @Column(name = "is_final_exam")
    private boolean isFinalExam;

    @Column(name = "passed")
    private boolean passed;

    @Column(name = "attempt_time")
    private LocalDateTime attemptTime;

    public QuizAttempt() {}

    public QuizAttempt(Long userId, String skillId, int scorePercentage, String weakTopics, String strongTopics, boolean isFinalExam, boolean passed) {
        this.userId = userId;
        this.skillId = skillId;
        this.scorePercentage = scorePercentage;
        this.weakTopics = weakTopics;
        this.strongTopics = strongTopics;
        this.isFinalExam = isFinalExam;
        this.passed = passed;
        this.attemptTime = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getSkillId() { return skillId; }
    public void setSkillId(String skillId) { this.skillId = skillId; }

    public int getScorePercentage() { return scorePercentage; }
    public void setScorePercentage(int scorePercentage) { this.scorePercentage = scorePercentage; }

    public String getWeakTopics() { return weakTopics; }
    public void setWeakTopics(String weakTopics) { this.weakTopics = weakTopics; }

    public String getStrongTopics() { return strongTopics; }
    public void setStrongTopics(String strongTopics) { this.strongTopics = strongTopics; }

    public boolean isFinalExam() { return isFinalExam; }
    public void setFinalExam(boolean finalExam) { isFinalExam = finalExam; }

    public boolean isPassed() { return passed; }
    public void setPassed(boolean passed) { this.passed = passed; }

    public LocalDateTime getAttemptTime() { return attemptTime; }
    public void setAttemptTime(LocalDateTime attemptTime) { this.attemptTime = attemptTime; }
}
