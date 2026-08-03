package com.skillpath.dashboard.dto;

public class AuthRequest {
    private String name;
    private String fullName;
    private String email;
    private String password;
    private String role;
    private String skillId;

    public AuthRequest() {}

    public String getName() { 
        return fullName != null ? fullName : name; 
    }
    public void setName(String name) { this.name = name; }

    public String getFullName() { 
        return fullName != null ? fullName : name; 
    }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getSkillId() { return skillId; }
    public void setSkillId(String skillId) { this.skillId = skillId; }
}
