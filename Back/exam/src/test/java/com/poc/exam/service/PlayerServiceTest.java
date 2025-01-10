package com.poc.exam.service;

import com.poc.exam.model.Player;
import com.poc.exam.repository.PlayerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PlayerServiceTest {

    @InjectMocks
    private PlayerService playerService;

    @Mock
    private PlayerRepository playerRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllPlayers() {
        List<Player> players = new ArrayList<>();
        players.add(new Player());
        players.add(new Player());

        when(playerRepository.findAll()).thenReturn(players);

        List<Player> result = playerService.getAllPlayers();
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(playerRepository, times(1)).findAll();
    }

    @Test
    public void testGetPlayerById() {
        Player player = new Player();
        player.setId(1L);

        when(playerRepository.findById(1L)).thenReturn(Optional.of(player));

        Optional<Player> result = playerService.getPlayerById(1L);
        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getId());
        verify(playerRepository, times(1)).findById(1L);
    }

    @Test
    public void testAddPlayer() {
        Player player = new Player();
        player.setName("John Doe");

        when(playerRepository.save(player)).thenReturn(player);

        Player result = playerService.addPlayer(player);
        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        verify(playerRepository, times(1)).save(player);
    }

    @Test
    public void testUpdatePlayer() {
        Player player = new Player();
        player.setId(1L);
        player.setName("John Updated");

        when(playerRepository.save(player)).thenReturn(player);

        Player result = playerService.updatePlayer(player);
        assertNotNull(result);
        assertEquals("John Updated", result.getName());
        verify(playerRepository, times(1)).save(player);
    }

    @Test
    public void testDeletePlayer() {
        Long playerId = 1L;

        doNothing().when(playerRepository).deleteById(playerId);

        playerService.deletePlayer(playerId);

        verify(playerRepository, times(1)).deleteById(playerId);
    }

    @Test
    public void testGetTopPlayers() {
        List<Player> topPlayers = new ArrayList<>();
        Player player1 = new Player();
        player1.setName("Top Player 1");
        player1.setPoints(50);

        Player player2 = new Player();
        player2.setName("Top Player 2");
        player2.setPoints(40);

        topPlayers.add(player1);
        topPlayers.add(player2);

        when(playerRepository.findTopPlayers()).thenReturn(topPlayers);

        List<Player> result = playerService.getTopPlayers();
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Top Player 1", result.get(0).getName());
        assertEquals(50, result.get(0).getPoints());
        verify(playerRepository, times(1)).findTopPlayers();
    }
}
