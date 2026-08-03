-- ===================================================================
-- LEARNING PATH DASHBOARD - DATABASE SCHEMA FOR MYSQL & H2
-- Standard SQL Data Types - Fully compatible with Spring Data JPA
-- Database Name (MySQL): skillpath_db
-- ===================================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    target_role VARCHAR(255) DEFAULT 'Student Learner',
    streak_days INT DEFAULT 0,
    active_skill VARCHAR(100) DEFAULT 'webdev',
    has_completed_assessment BOOLEAN DEFAULT FALSE,
    test_score INT DEFAULT 0,
    weak_areas VARCHAR(2000),
    recommended_courses VARCHAR(2000)
);

-- 2. Skills Catalog Table
CREATE TABLE IF NOT EXISTS skills (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    difficulty_level VARCHAR(50) NOT NULL,
    badge_class VARCHAR(50) NOT NULL,
    description VARCHAR(1000),
    total_topics INT DEFAULT 0,
    estimated_hours VARCHAR(50)
);

-- 3. Quiz Questions Table
CREATE TABLE IF NOT EXISTS quiz_questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    skill_id VARCHAR(100) NOT NULL,
    question_text VARCHAR(1000) NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_option INT NOT NULL,
    topic_category VARCHAR(255) NOT NULL,
    is_final_exam BOOLEAN DEFAULT FALSE
);

-- 4. Quiz Attempts History Table
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    skill_id VARCHAR(100) NOT NULL,
    score_percentage INT NOT NULL,
    weak_topics VARCHAR(2000),
    strong_topics VARCHAR(2000),
    is_final_exam BOOLEAN DEFAULT FALSE,
    passed BOOLEAN DEFAULT FALSE,
    attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Learning Path Topics Table
CREATE TABLE IF NOT EXISTS topics (
    id VARCHAR(100) PRIMARY KEY,
    skill_id VARCHAR(100) NOT NULL,
    phase VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    duration VARCHAR(50),
    subtopics VARCHAR(1000)
);

-- 6. Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    certificate_code VARCHAR(100) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    skill_name VARCHAR(255) NOT NULL,
    final_score INT NOT NULL,
    issue_date DATE NOT NULL
);