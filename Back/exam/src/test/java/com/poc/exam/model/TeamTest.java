package com.poc.exam.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TeamTest {

    @Test
    void testGettersAndSetters() {
        // Création d'un objet Team
        Team team = new Team();

        // Initialisation des valeurs de test
        Long id = 1L;
        String name = "Lyon FC";
        String city = "Lyon";
        String stadium = "Parc OL";
        int wins = 10;
        int losses = 5;
        String logoPath = "images/lyon_logo.png";

        // Utilisation des setters
        team.setId(id);
        team.setName(name);
        team.setCity(city);
        team.setStadium(stadium);
        team.setWins(wins);
        team.setLosses(losses);
        team.setLogoPath(logoPath);

        // Vérification des getters
        assertEquals(id, team.getId());
        assertEquals(name, team.getName());
        assertEquals(city, team.getCity());
        assertEquals(stadium, team.getStadium());
        assertEquals(wins, team.getWins());
        assertEquals(losses, team.getLosses());
        assertEquals(logoPath, team.getLogoPath());
    }

    @Test
    void testDefaultValues() {
        // Création d'un objet Team
        Team team = new Team();

        // Vérification que les valeurs par défaut sont correctement définies
        assertEquals(0, team.getWins());
        assertEquals(0, team.getLosses());
    }

    @Test
    void testUpdatingWinLossCounts() {
        // Création d'un objet Team
        Team team = new Team();

        // Modification des valeurs
        team.setWins(15);
        team.setLosses(7);

        // Vérification que les valeurs sont correctement mises à jour
        assertEquals(15, team.getWins());
        assertEquals(7, team.getLosses());
    }

    @Test
    void testSettingNullValues() {
        // Création d'un objet Team
        Team team = new Team();

        // Test de la gestion des valeurs nulles
        team.setName(null);
        team.setCity(null);
        team.setStadium(null);
        team.setLogoPath(null);

        // Vérification que les valeurs peuvent être nulles sans erreur
        assertNull(team.getName());
        assertNull(team.getCity());
        assertNull(team.getStadium());
        assertNull(team.getLogoPath());
    }
}
