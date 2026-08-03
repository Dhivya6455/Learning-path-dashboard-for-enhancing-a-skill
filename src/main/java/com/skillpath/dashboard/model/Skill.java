package com.skillpath.dashboard.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "icon", nullable = false)
    private String icon;

    @Column(name = "difficulty_level", nullable = false)
    private String difficultyLevel;

    @Column(name = "badge_class", nullable = false)
    private String badgeClass;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "total_topics")
    private int totalTopics;

    @Column(name = "estimated_hours")
    private String estimatedHours;

    public Skill() {}

    public Skill(String id, String name, String icon, String difficultyLevel, String badgeClass, String description, int totalTopics, String estimatedHours) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.difficultyLevel = difficultyLevel;
        this.badgeClass = badgeClass;
        this.description = description;
        this.totalTopics = totalTopics;
        this.estimatedHours = estimatedHours;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }

    public String getBadgeClass() { return badgeClass; }
    public void setBadgeClass(String badgeClass) { this.badgeClass = badgeClass; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getTotalTopics() { return totalTopics; }
    public void setTotalTopics(int totalTopics) { this.totalTopics = totalTopics; }

    public String getEstimatedHours() { return estimatedHours; }
    public void setEstimatedHours(String estimatedHours) { this.estimatedHours = estimatedHours; }
}
