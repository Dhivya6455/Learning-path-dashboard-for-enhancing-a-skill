package com.skillpath.dashboard.model;

import jakarta.persistence.*;

@Entity
@Table(name = "topic_progress")
public class TopicProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String topicId;
    private String skillId;
    private boolean completed;

    public TopicProgress() {}

    public TopicProgress(Long userId, String topicId, String skillId, boolean completed) {
        this.userId = userId;
        this.topicId = topicId;
        this.skillId = skillId;
        this.completed = completed;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getTopicId() { return topicId; }
    public void setTopicId(String topicId) { this.topicId = topicId; }

    public String getSkillId() { return skillId; }
    public void setSkillId(String skillId) { this.skillId = skillId; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
}
