package com.poc.exam.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ScorerTest {

    @Test
    void testGettersAndSetters() {
        // Création d'un objet Scorer
        Scorer scorer = new Scorer();

        // Mise à jour des valeurs via les setters
        scorer.setPlayerId(1L);
        scorer.setGoals(3);

        // Vérification des valeurs via les getters
        assertEquals(1L, scorer.getPlayerId());
        assertEquals(3, scorer.getGoals());
    }

    @Test
    void testDefaultValues() {
        // Création d'un objet Scorer sans initialisation
        Scorer scorer = new Scorer();

        // Vérification que les valeurs par défaut sont correctes
        assertNull(scorer.getPlayerId());
        assertEquals(0, scorer.getGoals());
    }

    @Test
    void testSetNullPlayerId() {
        // Création d'un objet Scorer
        Scorer scorer = new Scorer();

        // Mise à jour de playerId avec null
        scorer.setPlayerId(null);

        // Vérification que playerId est bien null
        assertNull(scorer.getPlayerId());
    }

    @Test
    void testToString() {
        // Création d'un objet Scorer
        Scorer scorer = new Scorer();
        scorer.setPlayerId(5L);
        scorer.setGoals(10);

        // Vérification de la méthode toString()
        String expectedString = "Scorer{playerId=5, goals=10}";
        assertEquals(expectedString, scorer.toString());
    }
}
