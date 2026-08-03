package com.skillpath.dashboard.dto;

public class ProgressResponse {
    private int overallPercentage;
    private int completedTopicsCount;
    private int totalTopicsCount;
    private int streakDays;
    private int certificatesEarned;

    public ProgressResponse() {}

    public ProgressResponse(int overallPercentage, int completedTopicsCount, int totalTopicsCount, int streakDays, int certificatesEarned) {
        this.overallPercentage = overallPercentage;
        this.completedTopicsCount = completedTopicsCount;
        this.totalTopicsCount = totalTopicsCount;
        this.streakDays = streakDays;
        this.certificatesEarned = certificatesEarned;
    }

    public int getOverallPercentage() { return overallPercentage; }
    public void setOverallPercentage(int overallPercentage) { this.overallPercentage = overallPercentage; }

    public int getCompletedTopicsCount() { return completedTopicsCount; }
    public void setCompletedTopicsCount(int completedTopicsCount) { this.completedTopicsCount = completedTopicsCount; }

    public int getTotalTopicsCount() { return totalTopicsCount; }
    public void setTotalTopicsCount(int totalTopicsCount) { this.totalTopicsCount = totalTopicsCount; }

    public int getStreakDays() { return streakDays; }
    public void setStreakDays(int streakDays) { this.streakDays = streakDays; }

    public int getCertificatesEarned() { return certificatesEarned; }
    public void setCertificatesEarned(int certificatesEarned) { this.certificatesEarned = certificatesEarned; }
}
