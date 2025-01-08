package com.poc.exam.controller;

import com.poc.exam.DTO.PlayerRequest;
import com.poc.exam.model.Player;
import com.poc.exam.model.Team;
import com.poc.exam.repository.TeamRepository;
import com.poc.exam.service.PlayerService;
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

class PlayerControllerTest {

    @InjectMocks
    private PlayerController playerController;

    @Mock
    private PlayerService playerService;

    @Mock
    private TeamRepository teamRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllPlayers() {
        // Préparer des données fictives
        List<Player> mockPlayers = new ArrayList<>();
        mockPlayers.add(new Player());
        when(playerService.getAllPlayers()).thenReturn(mockPlayers);

        // Appeler la méthode du contrôleur
        List<Player> result = playerController.getAllPlayers();

        // Vérifier le résultat
        assertEquals(1, result.size());
        verify(playerService, times(1)).getAllPlayers();
    }

    @Test
    void testAddPlayer_Success() {
        // Préparer les objets fictifs
        PlayerRequest mockRequest = new PlayerRequest();
        mockRequest.setName("John Doe");
        mockRequest.setPosition("Midfielder");

        Player mockPlayer = new Player();
        mockPlayer.setName("John Doe");
        mockPlayer.setPosition("Midfielder");

        when(playerService.addPlayer(any(Player.class))).thenReturn(mockPlayer);

        // Appeler la méthode du contrôleur
        Player result = playerController.addPlayer(mockRequest);

        // Vérifier le résultat
        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        verify(playerService, times(1)).addPlayer(any(Player.class));
    }

    @Test
    void testAddPlayer_TeamNotFound() {
        // Préparer les objets fictifs
        PlayerRequest mockRequest = new PlayerRequest();
        mockRequest.setName("John Doe");
        mockRequest.setPosition("Midfielder");
        mockRequest.setTeamId(999L);

        when(teamRepository.findById(999L)).thenReturn(Optional.empty());

        // Vérifier que la méthode lève une exception
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            playerController.addPlayer(mockRequest);
        });

        assertEquals("Team not found", exception.getMessage());
    }

    @Test
    void testUpdatePlayer_Success() {
        // Préparer les objets fictifs
        PlayerRequest mockRequest = new PlayerRequest();
        mockRequest.setName("Jane Doe");
        mockRequest.setPosition("Forward");

        Player mockPlayer = new Player();
        mockPlayer.setName("John Doe");
        mockPlayer.setPosition("Midfielder");

        when(playerService.getPlayerById(1L)).thenReturn(Optional.of(mockPlayer));
        when(playerService.updatePlayer(any(Player.class))).thenReturn(mockPlayer);

        // Appeler la méthode du contrôleur
        Player result = playerController.updatePlayer(1L, mockRequest);

        // Vérifier le résultat
        assertNotNull(result);
        assertEquals("Jane Doe", result.getName());
        verify(playerService, times(1)).updatePlayer(any(Player.class));
    }

    @Test
    void testDeletePlayer() {
        // Appeler la méthode du contrôleur
        playerController.deletePlayer(1L);

        // Vérifier que le service a été appelé
        verify(playerService, times(1)).deletePlayer(1L);
    }
}
