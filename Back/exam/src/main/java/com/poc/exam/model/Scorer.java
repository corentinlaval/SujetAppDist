package com.poc.exam.model;

public class Scorer {
    private Long playerId;
    private int goals;

    // Getters and Setters
    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public int getGoals() {
        return goals;
    }

    public void setGoals(int goals) {
        this.goals = goals;
    }

    // Méthode toString (optionnelle, utile pour le debug)
    @Override
    public String toString() {
        return "Scorer{" +
                "playerId=" + playerId +
                ", goals=" + goals +
                '}';
    }
}
