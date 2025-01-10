package com.poc.exam.service;

import com.poc.exam.model.Player;
import com.poc.exam.model.Team;
import com.poc.exam.repository.PlayerRepository;
import com.poc.exam.repository.TeamRepository;
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

public class TeamServiceTest {

    @InjectMocks
    private TeamService teamService;

    @Mock
    private TeamRepository teamRepository;

    @Mock
    private PlayerRepository playerRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllTeams() {
        List<Team> teams = new ArrayList<>();
        teams.add(new Team());
        teams.add(new Team());

        when(teamRepository.findAll()).thenReturn(teams);

        List<Team> result = teamService.getAllTeams();
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(teamRepository, times(1)).findAll();
    }

    @Test
    public void testAddTeam() {
        Team team = new Team();
        team.setName("Team Alpha");

        when(teamRepository.save(team)).thenReturn(team);

        Team result = teamService.addTeam(team);
        assertNotNull(result);
        assertEquals("Team Alpha", result.getName());
        verify(teamRepository, times(1)).save(team);
    }

    @Test
    public void testDeleteTeamSuccess() {
        Long teamId = 1L;
        when(teamRepository.existsById(teamId)).thenReturn(true);
        doNothing().when(teamRepository).deleteById(teamId);

        boolean result = teamService.deleteTeam(teamId);
        assertTrue(result);
        verify(teamRepository, times(1)).deleteById(teamId);
    }

    @Test
    public void testDeleteTeamFailure() {
        Long teamId = 1L;
        when(teamRepository.existsById(teamId)).thenReturn(false);

        boolean result = teamService.deleteTeam(teamId);
        assertFalse(result);
        verify(teamRepository, never()).deleteById(teamId);
    }

    @Test
    public void testUpdateTeamSuccess() {
        Long teamId = 1L;
        Team existingTeam = new Team();
        existingTeam.setId(teamId);
        existingTeam.setName("Old Team");

        Team updatedTeam = new Team();
        updatedTeam.setName("Updated Team");

        when(teamRepository.findById(teamId)).thenReturn(Optional.of(existingTeam));
        when(teamRepository.save(existingTeam)).thenReturn(existingTeam);

        Team result = teamService.updateTeam(teamId, updatedTeam);

        assertNotNull(result);
        assertEquals("Updated Team", result.getName());
        verify(teamRepository, times(1)).findById(teamId);
        verify(teamRepository, times(1)).save(existingTeam);
    }

    @Test
    public void testUpdateTeamNotFound() {
        Long teamId = 1L;
        Team updatedTeam = new Team();
        updatedTeam.setName("Updated Team");

        when(teamRepository.findById(teamId)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> teamService.updateTeam(teamId, updatedTeam));
        verify(teamRepository, times(1)).findById(teamId);
        verify(teamRepository, never()).save(any(Team.class));
    }

    @Test
    public void testGetTeamByIdSuccess() {
        Long teamId = 1L;
        Team team = new Team();
        team.setId(teamId);
        team.setName("Team Alpha");

        when(teamRepository.findById(teamId)).thenReturn(Optional.of(team));

        Team result = teamService.getTeamById(teamId);
        assertNotNull(result);
        assertEquals(teamId, result.getId());
        assertEquals("Team Alpha", result.getName());
        verify(teamRepository, times(1)).findById(teamId);
    }

    @Test
    public void testGetTeamByIdNotFound() {
        Long teamId = 1L;

        when(teamRepository.findById(teamId)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> teamService.getTeamById(teamId));
        verify(teamRepository, times(1)).findById(teamId);
    }

    @Test
    public void testGetPlayersByTeamId() {
        Long teamId = 1L;
        List<Player> players = new ArrayList<>();
        players.add(new Player());
        players.add(new Player());

        when(playerRepository.findByTeamId(teamId)).thenReturn(players);

        List<Player> result = teamService.getPlayersByTeamId(teamId);
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(playerRepository, times(1)).findByTeamId(teamId);
    }

    @Test
    public void testGetTopTeams() {
        List<Team> topTeams = new ArrayList<>();
        Team team1 = new Team();
        team1.setName("Team Alpha");
        team1.setWins(10);

        Team team2 = new Team();
        team2.setName("Team Beta");
        team2.setWins(8);

        topTeams.add(team1);
        topTeams.add(team2);

        when(teamRepository.findTopTeams()).thenReturn(topTeams);

        List<Team> result = teamService.getTopTeams();
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Team Alpha", result.get(0).getName());
        assertEquals(10, result.get(0).getWins());
        verify(teamRepository, times(1)).findTopTeams();
    }
}
