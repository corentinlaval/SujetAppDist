package com.poc.exam.model;

import com.poc.exam.model.Team;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "game") // Renommez la table en "game"
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "home_team_id")
    private Team homeTeam;

    @ManyToOne
    @JoinColumn(name = "away_team_id")
    private Team awayTeam;

    private LocalDate matchDate;
    private String location;
    private int homeScore;
    private int awayScore;

    // Getters et setters
}
