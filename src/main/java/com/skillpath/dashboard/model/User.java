package com.skillpath.dashboard.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name")
    private String fullName;
    
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "target_role")
    private String targetRole;

    @Column(name = "streak_days")
    private int streakDays;

    @Column(name = "active_skill")
    private String activeSkill;

    @Column(name = "has_completed_assessment")
    private boolean hasCompletedAssessment = false;

    @Column(name = "test_score")
    private Integer testScore = 0;

    @Column(name = "weak_areas", length = 2000)
    private String weakAreas;

    @Column(name = "recommended_courses", length = 2000)
    private String recommendedCourses;

    public User() {}

    public User(String fullName, String email, String password, String targetRole, int streakDays, String activeSkill) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.targetRole = targetRole;
        this.streakDays = streakDays;
        this.activeSkill = activeSkill;
        this.hasCompletedAssessment = false;
        this.testScore = 0;
        this.weakAreas = "";
        this.recommendedCourses = "";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }

    public int getStreakDays() { return streakDays; }
    public void setStreakDays(int streakDays) { this.streakDays = streakDays; }

    public String getActiveSkill() { return activeSkill; }
    public void setActiveSkill(String activeSkill) { this.activeSkill = activeSkill; }

    public boolean isHasCompletedAssessment() { return hasCompletedAssessment; }
    public void setHasCompletedAssessment(boolean hasCompletedAssessment) { this.hasCompletedAssessment = hasCompletedAssessment; }

    public Integer getTestScore() { return testScore; }
    public void setTestScore(Integer testScore) { this.testScore = testScore; }

    public String getWeakAreas() { return weakAreas; }
    public void setWeakAreas(String weakAreas) { this.weakAreas = weakAreas; }

    public String getRecommendedCourses() { return recommendedCourses; }
    public void setRecommendedCourses(String recommendedCourses) { this.recommendedCourses = recommendedCourses; }
}
