package com.poc.exam.service;

import com.poc.exam.model.*;
import com.poc.exam.repository.MatchRepository;
import com.poc.exam.repository.PlayerRepository;
import com.poc.exam.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private PlayerRepository playerRepository;

    // Récupérer les matchs à venir
    public List<Match> getUpcomingMatches() {
        return matchRepository.findByMatchDateAfter(LocalDate.now());
    }

    // Ajouter un match avec vérification des équipes
    public Match addMatch(Match match) {
        if (match.getHomeTeam() == null || match.getHomeTeam().getId() == null) {
            throw new RuntimeException("Home team must be provided.");
        }

        if (match.getAwayTeam() == null || match.getAwayTeam().getId() == null) {
            throw new RuntimeException("Away team must be provided.");
        }

        Optional<Team> homeTeam = teamRepository.findById(match.getHomeTeam().getId());
        if (homeTeam.isEmpty()) {
            throw new RuntimeException("Home team not found.");
        }

        Optional<Team> awayTeam = teamRepository.findById(match.getAwayTeam().getId());
        if (awayTeam.isEmpty()) {
            throw new RuntimeException("Away team not found.");
        }

        match.setHomeTeam(homeTeam.get());
        match.setAwayTeam(awayTeam.get());

        return matchRepository.save(match);
    }

    // Récupérer tous les matchs
    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    // Supprimer un match par ID
    public void deleteMatch(Long id) {
        if (matchRepository.existsById(id)) {
            matchRepository.deleteById(id);
        } else {
            throw new RuntimeException("Match not found with ID: " + id);
        }
    }

    // Méthode pour récupérer un match par son ID
    public Optional<Match> getMatchById(Long id) {
        return matchRepository.findById(id);
    }

    // Méthode pour sauvegarder un match mis à jour
    public void saveMatch(Match updatedMatch) {
        matchRepository.save(updatedMatch);
    }

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("hh:mm a");

    public LocalTime convertTime(String time) {
        return LocalTime.parse(time, TIME_FORMATTER);
    }

    public void deleteAllMatches() {
        List<Match> matches = matchRepository.findAll();

        for (Match match : matches) {
            if (match.getHomeTeam() != null && match.getAwayTeam() != null) {
                matchRepository.delete(match);
            }
        }
    }

    public void updateScoresAndScorers(ScoringRequest scoringRequest) {
        // Récupérer le match par ID
        Match match = matchRepository.findById(scoringRequest.getMatchId())
                .orElseThrow(() -> new RuntimeException("Match not found"));

        // Mettre à jour les scores
        match.setHomeScore(scoringRequest.getHomeScore());
        match.setAwayScore(scoringRequest.getAwayScore());

        // Mettre à jour les buteurs
        updatePlayerGoals(scoringRequest.getHomeScorers());
        updatePlayerGoals(scoringRequest.getAwayScorers());

        // Calculer le résultat du match et mettre à jour les statistiques d'équipe
        updateTeamStats(match);

        // Enregistrer les modifications du match
        matchRepository.save(match);
    }

    void updateTeamStats(Match match) {
        Team homeTeam = match.getHomeTeam();
        Team awayTeam = match.getAwayTeam();

        if (match.getHomeScore() > match.getAwayScore()) {
            // L'équipe à domicile gagne
            homeTeam.setWins(homeTeam.getWins() + 1);
            awayTeam.setLosses(awayTeam.getLosses() + 1);
        } else if (match.getHomeScore() < match.getAwayScore()) {
            // L'équipe à l'extérieur gagne
            awayTeam.setWins(awayTeam.getWins() + 1);
            homeTeam.setLosses(homeTeam.getLosses() + 1);
        }

        // Enregistrer les modifications des équipes
        teamRepository.save(homeTeam);
        teamRepository.save(awayTeam);
    }

    private void updatePlayerGoals(List<Scorer> scorers) {
        if (scorers == null || scorers.isEmpty()) {
            return; // Ne rien faire si la liste est null ou vide
        }

        for (Scorer scorer : scorers) {
            Player player = playerRepository.findById(scorer.getPlayerId())
                    .orElseThrow(() -> new RuntimeException("Player not found with ID: " + scorer.getPlayerId()));

            player.setGoals(player.getGoals() + scorer.getGoals());
            playerRepository.save(player);
        }
    }
}
