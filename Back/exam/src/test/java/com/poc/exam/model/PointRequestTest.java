package com.poc.exam.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PointRequestTest {

    @Test
    void testGettersAndSetters() {
        // Création d'un objet PointRequest
        PointRequest pointRequest = new PointRequest();

        // Mise à jour de playerId via le setter
        pointRequest.setPlayerId(10L);

        // Vérification du getter
        assertEquals(10L, pointRequest.getPlayerId());
    }

    @Test
    void testDefaultValues() {
        // Création d'un objet PointRequest sans initialisation
        PointRequest pointRequest = new PointRequest();

        // Vérification que playerId est null par défaut
        assertNull(pointRequest.getPlayerId());
    }

    @Test
    void testSetNullValue() {
        // Création d'un objet PointRequest
        PointRequest pointRequest = new PointRequest();

        // Mise à jour de playerId avec null
        pointRequest.setPlayerId(null);

        // Vérification que playerId est bien null
        assertNull(pointRequest.getPlayerId());
    }
}
