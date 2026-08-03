package com.skillpath.dashboard.controller;

import com.skillpath.dashboard.model.Topic;
import com.skillpath.dashboard.model.TopicProgress;
import com.skillpath.dashboard.service.LearningPathService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/path")
@CrossOrigin(origins = "*")
public class LearningPathController {

    private final LearningPathService learningPathService;

    public LearningPathController(LearningPathService learningPathService) {
        this.learningPathService = learningPathService;
    }

    @GetMapping("/{skillId}")
    public List<Topic> getTopics(@PathVariable String skillId) {
        return learningPathService.getTopicsForSkill(skillId);
    }

    @GetMapping("/progress/{userId}/{skillId}")
    public List<TopicProgress> getUserProgress(@PathVariable Long userId, @PathVariable String skillId) {
        return learningPathService.getUserProgress(userId, skillId);
    }

    @PostMapping("/toggle")
    public TopicProgress toggleProgress(@RequestParam Long userId, @RequestParam String topicId, @RequestParam String skillId) {
        return learningPathService.toggleTopicProgress(userId, topicId, skillId);
    }
}
