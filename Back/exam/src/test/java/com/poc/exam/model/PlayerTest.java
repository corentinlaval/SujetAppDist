package com.poc.exam.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PlayerTest {

    @Test
    void testGettersAndSetters() {
        // Création de l'objet Team fictif
        Team team = new Team();
        team.setId(1L);
        team.setName("Team A");

        // Création de l'objet Player
        Player player = new Player();
        player.setId(100L);
        player.setName("John Doe");
        player.setPoints(10);
        player.setPosition("Forward");
        player.setProfilePicturePath("/images/profile.jpg");
        player.setTeam(team);

        // Vérification des valeurs avec les getters
        assertEquals(100L, player.getId());
        assertEquals("John Doe", player.getName());
        assertEquals(10, player.getPoints());
        assertEquals("Forward", player.getPosition());
        assertEquals("/images/profile.jpg", player.getProfilePicturePath());
        assertEquals(team, player.getTeam());
    }

    @Test
    void testDefaultValues() {
        // Création d'un objet Player sans initialisation
        Player player = new Player();

        // Vérification des valeurs par défaut
        assertNull(player.getId());
        assertNull(player.getName());
        assertEquals(0, player.getPoints()); // La valeur par défaut des points doit être 0
        assertNull(player.getPosition());
        assertNull(player.getProfilePicturePath());
        assertNull(player.getTeam());
    }

    @Test
    void testSetGoals() {
        // Création d'un objet Player
        Player player = new Player();
        player.setGoals(5);

        // Vérification de la valeur de `points` mise à jour via `setGoals`
        assertEquals(5, player.getGoals());
    }

    @Test
    void testUpdatePoints() {
        // Création d'un objet Player
        Player player = new Player();

        // Modification des points
        player.setPoints(20);

        // Vérification des points mis à jour
        assertEquals(20, player.getPoints());
    }

    @Test
    void testSetNullValues() {
        // Création d'un objet Player
        Player player = new Player();

        // Mise à jour des valeurs avec `null`
        player.setName(null);
        player.setPosition(null);
        player.setProfilePicturePath(null);
        player.setTeam(null);

        // Vérification des valeurs
        assertNull(player.getName());
        assertNull(player.getPosition());
        assertNull(player.getProfilePicturePath());
        assertNull(player.getTeam());
    }
}
