package com.poc.exam.model;

import java.util.List;

public class ScoringRequest {
    private Long matchId;
    private int homeScore;
    private int awayScore;
    private List<Scorer> homeScorers;
    private List<Scorer> awayScorers;

    // Getters and Setters
    public Long getMatchId() {
        return matchId;
    }

    public void setMatchId(Long matchId) {
        this.matchId = matchId;
    }

    public int getHomeScore() {
        return homeScore;
    }

    public void setHomeScore(int homeScore) {
        this.homeScore = homeScore;
    }

    public int getAwayScore() {
        return awayScore;
    }

    public void setAwayScore(int awayScore) {
        this.awayScore = awayScore;
    }

    public List<Scorer> getHomeScorers() {
        return homeScorers;
    }

    public void setHomeScorers(List<Scorer> homeScorers) {
        this.homeScorers = homeScorers;
    }

    public List<Scorer> getAwayScorers() {
        return awayScorers;
    }

    public void setAwayScorers(List<Scorer> awayScorers) {
        this.awayScorers = awayScorers;
    }
}
