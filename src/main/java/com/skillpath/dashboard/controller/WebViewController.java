package com.skillpath.dashboard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebViewController {

    @GetMapping("/")
    public String index() {
        return "forward:/login.html";
    }

    @GetMapping("/login")
    public String login() {
        return "forward:/login.html";
    }

    @GetMapping("/register")
    public String register() {
        return "forward:/register.html";
    }

    @GetMapping("/skills")
    public String skills() {
        return "forward:/skills.html";
    }

    @GetMapping("/quiz")
    public String quiz() {
        return "forward:/quiz.html";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "forward:/dashboard.html";
    }

    @GetMapping("/course")
    public String course() {
        return "forward:/course.html";
    }

    @GetMapping("/learningpath")
    public String learningpath() {
        return "forward:/learningpath.html";
    }

    @GetMapping("/progress")
    public String progress() {
        return "forward:/progress.html";
    }

    @GetMapping("/certificate")
    public String certificate() {
        return "forward:/certificate.html";
    }
}
