package com.skillpath.dashboard.controller;

import com.skillpath.dashboard.dto.ProgressResponse;
import com.skillpath.dashboard.repository.CertificateRepository;
import com.skillpath.dashboard.repository.TopicProgressRepository;
import com.skillpath.dashboard.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
public class ProgressController {

    private final TopicProgressRepository topicProgressRepository;
    private final CertificateRepository certificateRepository;
    private final UserRepository userRepository;

    public ProgressController(TopicProgressRepository topicProgressRepository,
                              CertificateRepository certificateRepository,
                              UserRepository userRepository) {
        this.topicProgressRepository = topicProgressRepository;
        this.certificateRepository = certificateRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/{userId}")
    public ProgressResponse getOverallProgress(@PathVariable Long userId) {
        long completed = topicProgressRepository.findByUserId(userId).stream().filter(tp -> tp.isCompleted()).count();
        int total = 12; // Base catalog modules
        int pct = Math.min(100, Math.round(((float) completed / Math.max(1, total)) * 100));
        int certs = certificateRepository.findByUserId(userId).size();
        int streak = userRepository.findById(userId).map(u -> u.getStreakDays()).orElse(5);

        return new ProgressResponse(pct, (int) completed, total, streak, certs);
    }
}
