package com.skillpath.dashboard.model;

import jakarta.persistence.*;

@Entity
@Table(name = "quiz_questions")
public class QuizQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "skill_id", nullable = false)
    private String skillId;
    
    @Column(name = "question_text", length = 1000, nullable = false)
    private String questionText;

    @Column(name = "option_a", nullable = false)
    private String optionA;

    @Column(name = "option_b", nullable = false)
    private String optionB;

    @Column(name = "option_c", nullable = false)
    private String optionC;

    @Column(name = "option_d", nullable = false)
    private String optionD;
    
    @Column(name = "correct_option", nullable = false)
    private int correctOption;

    @Column(name = "topic_category", nullable = false)
    private String topicCategory;

    @Column(name = "is_final_exam")
    private boolean isFinalExam;

    public QuizQuestion() {}

    public QuizQuestion(String skillId, String questionText, String optionA, String optionB, String optionC, String optionD, int correctOption, String topicCategory, boolean isFinalExam) {
        this.skillId = skillId;
        this.questionText = questionText;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.correctOption = correctOption;
        this.topicCategory = topicCategory;
        this.isFinalExam = isFinalExam;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSkillId() { return skillId; }
    public void setSkillId(String skillId) { this.skillId = skillId; }

    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }

    public String getOptionA() { return optionA; }
    public void setOptionA(String optionA) { this.optionA = optionA; }

    public String getOptionB() { return optionB; }
    public void setOptionB(String optionB) { this.optionB = optionB; }

    public String getOptionC() { return optionC; }
    public void setOptionC(String optionC) { this.optionC = optionC; }

    public String getOptionD() { return optionD; }
    public void setOptionD(String optionD) { this.optionD = optionD; }

    public int getCorrectOption() { return correctOption; }
    public void setCorrectOption(int correctOption) { this.correctOption = correctOption; }

    public String getTopicCategory() { return topicCategory; }
    public void setTopicCategory(String topicCategory) { this.topicCategory = topicCategory; }

    public boolean isFinalExam() { return isFinalExam; }
    public void setFinalExam(boolean finalExam) { isFinalExam = finalExam; }
}
