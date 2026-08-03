package com.skillpath.dashboard.repository;

import com.skillpath.dashboard.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    List<QuizAttempt> findByUserIdAndSkillIdOrderByAttemptTimeDesc(Long userId, String skillId);
    List<QuizAttempt> findByUserIdOrderByAttemptTimeDesc(Long userId);
}
