package com.skillpath.dashboard.controller;

import com.skillpath.dashboard.model.Certificate;
import com.skillpath.dashboard.repository.CertificateRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificate")
@CrossOrigin(origins = "*")
public class CertificateController {

    private final CertificateRepository certificateRepository;

    public CertificateController(CertificateRepository certificateRepository) {
        this.certificateRepository = certificateRepository;
    }

    @GetMapping("/user/{userId}")
    public List<Certificate> getUserCertificates(@PathVariable Long userId) {
        return certificateRepository.findByUserId(userId);
    }

    @GetMapping("/user/{userId}/skill/{skillId}")
    public Certificate getUserCertificateForSkill(@PathVariable Long userId, @PathVariable String skillId) {
        List<Certificate> certs = certificateRepository.findByUserId(userId);
        return certs.stream()
                .filter(c -> c.getSkillName().equalsIgnoreCase(skillId) || c.getSkillName().toLowerCase().contains(skillId.toLowerCase()))
                .findFirst()
                .orElse(null);
    }
}
