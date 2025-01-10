package com.poc.exam.controller;

import com.poc.exam.model.Match;
import com.poc.exam.service.MatchService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MatchControllerTest {

    @InjectMocks
    private MatchController matchController;

    @Mock
    private MatchService matchService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllMatches() {
        // Préparer des données fictives
        List<Match> mockMatches = new ArrayList<>();
        mockMatches.add(new Match());
        when(matchService.getAllMatches()).thenReturn(mockMatches);

        // Appeler la méthode du contrôleur
        List<Match> result = matchController.getAllMatches();

        // Vérifier le résultat
        assertEquals(1, result.size());
        verify(matchService, times(1)).getAllMatches();
    }

    @Test
    void testAddMatch_Success() {
        // Préparer un Match fictif
        Match mockMatch = new Match();
        mockMatch.setId(1L);
        mockMatch.setMatchDate(LocalDate.now());

        when(matchService.addMatch(any(Match.class))).thenReturn(mockMatch);

        // Appeler la méthode du contrôleur
        ResponseEntity<?> response = matchController.addMatch(mockMatch);

        // Vérifier le résultat
        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        verify(matchService, times(1)).addMatch(any(Match.class));
    }

    @Test
    void testAddMatch_Failure() {
        // Simuler une exception
        when(matchService.addMatch(any(Match.class))).thenThrow(new RuntimeException("Match could not be added"));

        // Appeler la méthode du contrôleur
        Match mockMatch = new Match();
        ResponseEntity<?> response = matchController.addMatch(mockMatch);

        // Vérifier le résultat
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Match could not be added", response.getBody());
    }

    @Test
    void testDeleteMatch() {
        // Appeler la méthode du contrôleur
        matchController.deleteMatch(1L);

        // Vérifier que le service a été appelé
        verify(matchService, times(1)).deleteMatch(1L);
    }
}
