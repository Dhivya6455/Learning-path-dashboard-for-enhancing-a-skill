package com.skillpath.dashboard.repository;

import com.skillpath.dashboard.model.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {
    List<QuizQuestion> findBySkillIdAndIsFinalExamFalse(String skillId);
    List<QuizQuestion> findByIsFinalExamTrue();
}
