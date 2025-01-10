package com.poc.exam.controller;

import com.poc.exam.model.Player;
import com.poc.exam.model.Team;
import com.poc.exam.service.TeamService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TeamControllerTest {

    @InjectMocks
    private TeamController teamController;

    @Mock
    private TeamService teamService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllTeams() {
        // Préparer des données fictives
        List<Team> mockTeams = new ArrayList<>();
        mockTeams.add(new Team());
        when(teamService.getAllTeams()).thenReturn(mockTeams);

        // Appeler la méthode du contrôleur
        List<Team> result = teamController.getAllTeams();

        // Vérifier le résultat
        assertEquals(1, result.size());
        verify(teamService, times(1)).getAllTeams();
    }

    @Test
    void testAddTeam() {
        // Préparer des données fictives
        Team mockTeam = new Team();
        mockTeam.setName("Team A");

        when(teamService.addTeam(any(Team.class))).thenReturn(mockTeam);

        // Appeler la méthode du contrôleur
        Team result = teamController.addTeam(mockTeam);

        // Vérifier le résultat
        assertNotNull(result);
        assertEquals("Team A", result.getName());
        verify(teamService, times(1)).addTeam(any(Team.class));
    }

    @Test
    void testDeleteTeam_Success() {
        // Simuler une suppression réussie
        when(teamService.deleteTeam(1L)).thenReturn(true);

        // Appeler la méthode du contrôleur
        ResponseEntity<Void> response = teamController.deleteTeam(1L);

        // Vérifier le résultat
        assertEquals(204, response.getStatusCodeValue());
        verify(teamService, times(1)).deleteTeam(1L);
    }

    @Test
    void testDeleteTeam_NotFound() {
        // Simuler une suppression échouée
        when(teamService.deleteTeam(1L)).thenReturn(false);

        // Appeler la méthode du contrôleur
        ResponseEntity<Void> response = teamController.deleteTeam(1L);

        // Vérifier le résultat
        assertEquals(404, response.getStatusCodeValue());
        verify(teamService, times(1)).deleteTeam(1L);
    }

    @Test
    void testUpdateTeam() {
        // Préparer les objets fictifs
        Team mockTeam = new Team();
        mockTeam.setName("Updated Team");

        when(teamService.updateTeam(anyLong(), any(Team.class))).thenReturn(mockTeam);

        // Appeler la méthode du contrôleur
        Team result = teamController.updateTeam(1L, mockTeam);

        // Vérifier le résultat
        assertNotNull(result);
        assertEquals("Updated Team", result.getName());
        verify(teamService, times(1)).updateTeam(anyLong(), any(Team.class));
    }

    @Test
    void testGetTeamPlayers() {
        // Préparer des données fictives
        List<Player> mockPlayers = new ArrayList<>();
        mockPlayers.add(new Player());

        when(teamService.getPlayersByTeamId(1L)).thenReturn(mockPlayers);

        // Appeler la méthode du contrôleur
        ResponseEntity<List<Player>> response = teamController.getTeamPlayers(1L);

        // Vérifier le résultat
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
        verify(teamService, times(1)).getPlayersByTeamId(1L);
    }

    @Test
    void testGetTopTeams() {
        // Préparer des données fictives
        List<Team> mockTopTeams = new ArrayList<>();
        mockTopTeams.add(new Team());

        when(teamService.getTopTeams()).thenReturn(mockTopTeams);

        // Appeler la méthode du contrôleur
        List<Team> result = teamController.getTopTeams();

        // Vérifier le résultat
        assertEquals(1, result.size());
        verify(teamService, times(1)).getTopTeams();
    }
}
