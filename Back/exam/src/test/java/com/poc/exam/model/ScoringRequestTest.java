package com.poc.exam.model;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ScoringRequestTest {

    @Test
    void testGettersAndSetters() {
        // Création de l'objet ScoringRequest
        ScoringRequest scoringRequest = new ScoringRequest();

        // Création de données factices
        Long matchId = 1L;
        int homeScore = 3;
        int awayScore = 2;

        // Initialisation des listes de Scorer
        List<Scorer> homeScorers = new ArrayList<>();
        homeScorers.add(new Scorer());
        homeScorers.add(new Scorer());

        List<Scorer> awayScorers = new ArrayList<>();
        awayScorers.add(new Scorer());

        // Utilisation des setters
        scoringRequest.setMatchId(matchId);
        scoringRequest.setHomeScore(homeScore);
        scoringRequest.setAwayScore(awayScore);
        scoringRequest.setHomeScorers(homeScorers);
        scoringRequest.setAwayScorers(awayScorers);

        // Vérification des getters
        assertEquals(matchId, scoringRequest.getMatchId());
        assertEquals(homeScore, scoringRequest.getHomeScore());
        assertEquals(awayScore, scoringRequest.getAwayScore());
        assertEquals(homeScorers, scoringRequest.getHomeScorers());
        assertEquals(awayScorers, scoringRequest.getAwayScorers());
    }

    @Test
    void testEmptyScorersList() {
        // Création de l'objet ScoringRequest
        ScoringRequest scoringRequest = new ScoringRequest();

        // Vérification que les listes sont nulles par défaut
        assertNull(scoringRequest.getHomeScorers());
        assertNull(scoringRequest.getAwayScorers());

        // Initialisation avec des listes vides
        scoringRequest.setHomeScorers(new ArrayList<>());
        scoringRequest.setAwayScorers(new ArrayList<>());

        // Vérification que les listes ne sont plus nulles
        assertNotNull(scoringRequest.getHomeScorers());
        assertNotNull(scoringRequest.getAwayScorers());

        // Vérification que les listes sont vides
        assertTrue(scoringRequest.getHomeScorers().isEmpty());
        assertTrue(scoringRequest.getAwayScorers().isEmpty());
    }

    @Test
    void testAddingScorersToLists() {
        // Création de l'objet ScoringRequest
        ScoringRequest scoringRequest = new ScoringRequest();

        // Création de données Scorer
        Scorer homeScorer = new Scorer();
        homeScorer.setPlayerId(1L);
        homeScorer.setGoals(2);

        Scorer awayScorer = new Scorer();
        awayScorer.setPlayerId(2L);
        awayScorer.setGoals(1);

        // Ajout de Scorers aux listes
        List<Scorer> homeScorers = new ArrayList<>();
        homeScorers.add(homeScorer);

        List<Scorer> awayScorers = new ArrayList<>();
        awayScorers.add(awayScorer);

        // Utilisation des setters
        scoringRequest.setHomeScorers(homeScorers);
        scoringRequest.setAwayScorers(awayScorers);

        // Vérification que les listes contiennent les Scorers
        assertEquals(1, scoringRequest.getHomeScorers().size());
        assertEquals(1, scoringRequest.getAwayScorers().size());

        assertEquals(homeScorer, scoringRequest.getHomeScorers().get(0));
        assertEquals(awayScorer, scoringRequest.getAwayScorers().get(0));
    }
}
