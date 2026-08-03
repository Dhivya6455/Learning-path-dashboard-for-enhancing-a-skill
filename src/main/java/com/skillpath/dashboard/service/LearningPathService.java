package com.skillpath.dashboard.service;

import com.skillpath.dashboard.model.Topic;
import com.skillpath.dashboard.model.TopicProgress;
import com.skillpath.dashboard.repository.TopicProgressRepository;
import com.skillpath.dashboard.repository.TopicRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LearningPathService {

    private final TopicRepository topicRepository;
    private final TopicProgressRepository topicProgressRepository;

    public LearningPathService(TopicRepository topicRepository, TopicProgressRepository topicProgressRepository) {
        this.topicRepository = topicRepository;
        this.topicProgressRepository = topicProgressRepository;
    }

    public List<Topic> getTopicsForSkill(String skillId) {
        return topicRepository.findBySkillId(skillId);
    }

    public List<TopicProgress> getUserProgress(Long userId, String skillId) {
        return topicProgressRepository.findByUserIdAndSkillId(userId, skillId);
    }

    public TopicProgress toggleTopicProgress(Long userId, String topicId, String skillId) {
        Optional<TopicProgress> existing = topicProgressRepository.findByUserIdAndTopicId(userId, topicId);
        if (existing.isPresent()) {
            TopicProgress tp = existing.get();
            tp.setCompleted(!tp.isCompleted());
            return topicProgressRepository.save(tp);
        } else {
            TopicProgress tp = new TopicProgress(userId, topicId, skillId, true);
            return topicProgressRepository.save(tp);
        }
    }
}
