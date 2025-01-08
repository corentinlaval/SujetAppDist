package com.poc.exam.controller;

import com.poc.exam.model.*;
import com.poc.exam.service.MatchService;
import com.poc.exam.service.PlayerService;
import com.poc.exam.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    @Autowired
    private MatchService matchService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private PlayerService playerService;

    @GetMapping
    public List<Match> getAllMatches() {
        return matchService.getAllMatches();
    }

    @PostMapping
    public ResponseEntity<?> addMatch(@RequestBody Match match) {
        try {
            Match savedMatch = matchService.addMatch(match);
            return ResponseEntity.ok(savedMatch);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMatch(@PathVariable Long id, @RequestBody Match match) {
        Optional<Match> existingMatch = matchService.getMatchById(id);
        if (existingMatch.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Match updatedMatch = existingMatch.get();
        updatedMatch.setHomeTeam(match.getHomeTeam());
        updatedMatch.setAwayTeam(match.getAwayTeam());
        updatedMatch.setMatchDate(match.getMatchDate());
        updatedMatch.setLocation(match.getLocation());
        updatedMatch.setHomeScore(match.getHomeScore());
        updatedMatch.setAwayScore(match.getAwayScore());
        updatedMatch.setMatchTime(match.getMatchTime());

        matchService.saveMatch(updatedMatch);

        return ResponseEntity.ok(updatedMatch);
    }

    @DeleteMapping("/{id}")
    public void deleteMatch(@PathVariable Long id) {
        matchService.deleteMatch(id);
    }

    @DeleteMapping("/all")
    public ResponseEntity<String> deleteAllMatches() {
        matchService.deleteAllMatches();
        return ResponseEntity.ok("All matches deleted successfully!");
    }

    @PostMapping("/update-scores")
    public ResponseEntity<Map<String, String>> updateScoresAndScorers(@RequestBody ScoringRequest scoringRequest) {
        try {
            matchService.updateScoresAndScorers(scoringRequest);

            // Construire une réponse JSON
            Map<String, String> response = new HashMap<>();
            response.put("message", "Scores and scorers updated successfully!");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error updating scores and scorers: " + e.getMessage());

            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/upcoming")
    public List<Match> getUpcomingMatches() {
        return matchService.getUpcomingMatches();
    }

    @GetMapping("/teams/top")
    public List<Team> getTopTeams() {
        return teamService.getTopTeams();
    }

    @GetMapping("/players/top")
    public List<Player> getTopPlayers() {
        return playerService.getTopPlayers();
    }
}
