package com.poc.exam.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class MatchTest {

    @Test
    void testGettersAndSetters() {
        // Création des objets Team fictifs
        Team homeTeam = new Team();
        homeTeam.setId(1L);
        homeTeam.setName("Team A");

        Team awayTeam = new Team();
        awayTeam.setId(2L);
        awayTeam.setName("Team B");

        // Création de l'objet Match
        Match match = new Match();
        match.setId(100L);
        match.setHomeTeam(homeTeam);
        match.setAwayTeam(awayTeam);
        match.setMatchDate(LocalDate.of(2025, 1, 1));
        match.setLocation("Stadium 1");
        match.setHomeScore(3);
        match.setAwayScore(2);
        match.setMatchTime("15:30");
        match.setResult("Win");

        // Assertions sur les getters
        assertEquals(100L, match.getId());
        assertEquals(homeTeam, match.getHomeTeam());
        assertEquals(awayTeam, match.getAwayTeam());
        assertEquals(LocalDate.of(2025, 1, 1), match.getMatchDate());
        assertEquals("Stadium 1", match.getLocation());
        assertEquals(3, match.getHomeScore());
        assertEquals(2, match.getAwayScore());
        assertEquals("15:30", match.getMatchTime());
        assertEquals("Win", match.getResult());
    }

    @Test
    void testDefaultValues() {
        // Création d'un objet Match sans initialisation
        Match match = new Match();

        // Vérification des valeurs par défaut
        assertNull(match.getId());
        assertNull(match.getHomeTeam());
        assertNull(match.getAwayTeam());
        assertNull(match.getMatchDate());
        assertNull(match.getLocation());
        assertEquals(0, match.getHomeScore());
        assertEquals(0, match.getAwayScore());
        assertNull(match.getMatchTime());
        assertNull(match.getResult());
    }

    @Test
    void testMatchEquality() {
        // Création de deux objets Match identiques
        Match match1 = new Match();
        match1.setId(1L);

        Match match2 = new Match();
        match2.setId(1L);

        // Vérification de l'égalité
        assertEquals(match1.getId(), match2.getId());
    }

    @Test
    void testScoreUpdate() {
        // Création d'un match et modification des scores
        Match match = new Match();
        match.setHomeScore(5);
        match.setAwayScore(3);

        // Vérification des scores mis à jour
        assertEquals(5, match.getHomeScore());
        assertEquals(3, match.getAwayScore());
    }

    @Test
    void testSetNullValues() {
        // Création d'un objet Match
        Match match = new Match();

        // Mise à jour des valeurs avec `null`
        match.setHomeTeam(null);
        match.setAwayTeam(null);
        match.setMatchDate(null);
        match.setLocation(null);
        match.setMatchTime(null);
        match.setResult(null);

        // Vérification des valeurs
        assertNull(match.getHomeTeam());
        assertNull(match.getAwayTeam());
        assertNull(match.getMatchDate());
        assertNull(match.getLocation());
        assertNull(match.getMatchTime());
        assertNull(match.getResult());
    }
}
