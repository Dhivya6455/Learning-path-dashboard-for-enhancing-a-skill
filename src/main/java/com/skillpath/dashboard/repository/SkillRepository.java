package com.skillpath.dashboard.repository;

import com.skillpath.dashboard.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, String> {
}
