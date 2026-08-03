package com.skillpath.dashboard.model;

import jakarta.persistence.*;

@Entity
@Table(name = "topics")
public class Topic {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "skill_id", nullable = false)
    private String skillId;

    @Column(name = "phase", nullable = false)
    private String phase; // BEGINNER, INTERMEDIATE, ADVANCED

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "duration")
    private String duration;
    
    @Column(name = "subtopics", length = 1000)
    private String subtopics;

    public Topic() {}

    public Topic(String id, String skillId, String phase, String title, String duration, String subtopics) {
        this.id = id;
        this.skillId = skillId;
        this.phase = phase;
        this.title = title;
        this.duration = duration;
        this.subtopics = subtopics;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSkillId() { return skillId; }
    public void setSkillId(String skillId) { this.skillId = skillId; }

    public String getPhase() { return phase; }
    public void setPhase(String phase) { this.phase = phase; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getSubtopics() { return subtopics; }
    public void setSubtopics(String subtopics) { this.subtopics = subtopics; }
}
