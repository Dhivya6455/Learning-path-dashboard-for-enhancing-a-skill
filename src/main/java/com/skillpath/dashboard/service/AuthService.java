package com.skillpath.dashboard.service;

import com.skillpath.dashboard.dto.AuthRequest;
import com.skillpath.dashboard.model.User;
import com.skillpath.dashboard.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register User
    public User register(AuthRequest request) {
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email address is required.");
        }
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Password is required.");
        }

        String email = request.getEmail().trim().toLowerCase();

        // Check if email already exists
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalStateException("Email address is already registered. Please sign in instead.");
        }

        String name = request.getName();
        if (name == null || name.trim().isEmpty()) {
            name = "Learner";
        }

        User user = new User(
                name.trim(),
                email,
                request.getPassword(),
                request.getRole() != null ? request.getRole() : "Student Learner",
                1,          // Initial streak
                "webdev"    // Default initial skill
        );
        user.setHasCompletedAssessment(false);

        return userRepository.save(user);
    }

    // Login User
    public User login(AuthRequest request) {
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email address is required.");
        }
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Password is required.");
        }

        String email = request.getEmail().trim().toLowerCase();
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("No account found with this email address. Please register first.");
        }

        User user = optionalUser.get();

        if (!user.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("Invalid password. Please check your credentials.");
        }

        return user;
    }

    // Update User Selected Skill
    public User updateUserSkill(Long userId, String skillId) {
        User user = getUserProfile(userId);
        user.setActiveSkill(skillId);
        return userRepository.save(user);
    }

    // Update User Assessment Results & Set Complete
    public User updateAssessmentResults(Long userId, String skillId, int score, String weakAreas, String recommendations) {
        User user = getUserProfile(userId);
        if (skillId != null && !skillId.trim().isEmpty()) {
            user.setActiveSkill(skillId);
        }
        user.setTestScore(score);
        user.setWeakAreas(weakAreas);
        user.setRecommendedCourses(recommendations);
        user.setHasCompletedAssessment(true);
        return userRepository.save(user);
    }

    // Get User Profile
    public User getUserProfile(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + id));
    }
}