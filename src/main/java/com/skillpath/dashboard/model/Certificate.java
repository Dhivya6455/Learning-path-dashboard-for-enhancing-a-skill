package com.skillpath.dashboard.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "certificates")
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "certificate_code", unique = true, nullable = false)
    private String certificateCode;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "skill_name", nullable = false)
    private String skillName;

    @Column(name = "final_score", nullable = false)
    private int finalScore;

    @Column(name = "issue_date", nullable = false)
    private LocalDate issueDate;

    public Certificate() {}

    public Certificate(String certificateCode, Long userId, String userName, String skillName, int finalScore, LocalDate issueDate) {
        this.certificateCode = certificateCode;
        this.userId = userId;
        this.userName = userName;
        this.skillName = skillName;
        this.finalScore = finalScore;
        this.issueDate = issueDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCertificateCode() { return certificateCode; }
    public void setCertificateCode(String certificateCode) { this.certificateCode = certificateCode; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }

    public int getFinalScore() { return finalScore; }
    public void setFinalScore(int finalScore) { this.finalScore = finalScore; }

    public LocalDate getIssueDate() { return issueDate; }
    public void setIssueDate(LocalDate issueDate) { this.issueDate = issueDate; }
}
