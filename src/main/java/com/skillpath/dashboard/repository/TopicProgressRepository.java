package com.skillpath.dashboard.repository;

import com.skillpath.dashboard.model.TopicProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TopicProgressRepository extends JpaRepository<TopicProgress, Long> {
    List<TopicProgress> findByUserIdAndSkillId(Long userId, String skillId);
    List<TopicProgress> findByUserId(Long userId);
    Optional<TopicProgress> findByUserIdAndTopicId(Long userId, String topicId);
}
