package com.skillpath.dashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LearningPathDashboardApplication {

    public static void main(String[] args) {
        SpringApplication.run(LearningPathDashboardApplication.class, args);
        System.out.println("=========================================================");
        System.out.println("🚀 Learning Path Dashboard Java Spring Boot API is Running!");
        System.out.println("🌐 Server URL: http://localhost:8080");
        System.out.println("🗄️ H2 Console: http://localhost:8080/h2-console");
        System.out.println("=========================================================");
    }
}
