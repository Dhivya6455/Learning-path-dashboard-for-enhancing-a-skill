package com.skillpath.dashboard.controller;

import com.skillpath.dashboard.model.Skill;
import com.skillpath.dashboard.repository.SkillRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillController {

    private final SkillRepository skillRepository;

    public SkillController(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @GetMapping
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    @GetMapping("/{id}")
    public Skill getSkillById(@PathVariable String id) {
        return skillRepository.findById(id).orElse(null);
    }
}
