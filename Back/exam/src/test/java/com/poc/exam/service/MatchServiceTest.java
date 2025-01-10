package com.poc.exam.service;

import com.poc.exam.model.*;
import com.poc.exam.repository.MatchRepository;
import com.poc.exam.repository.PlayerRepository;
import com.poc.exam.repository.TeamRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class MatchServiceTest {

    @InjectMocks
    private MatchService matchService;

    @Mock
    private MatchRepository matchRepository;

    @Mock
    private TeamRepository teamRepository;

    @Mock
    private PlayerRepository playerRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetUpcomingMatches() {
        // Mock de la date actuelle
        Match match1 = new Match();
        match1.setMatchDate(LocalDate.now().plusDays(1));

        Match match2 = new Match();
        match2.setMatchDate(LocalDate.now().plusDays(2));

        when(matchRepository.findByMatchDateAfter(any(LocalDate.class))).thenReturn(Arrays.asList(match1, match2));

        List<Match> matches = matchService.getUpcomingMatches();

        assertEquals(2, matches.size());
        verify(matchRepository, times(1)).findByMatchDateAfter(any(LocalDate.class));
    }

    @Test
    public void testAddMatchSuccess() {
        Team homeTeam = new Team();
        homeTeam.setId(1L);

        Team awayTeam = new Team();
        awayTeam.setId(2L);

        Match match = new Match();
        match.setHomeTeam(homeTeam);
        match.setAwayTeam(awayTeam);

        when(teamRepository.findById(1L)).thenReturn(Optional.of(homeTeam));
        when(teamRepository.findById(2L)).thenReturn(Optional.of(awayTeam));
        when(matchRepository.save(any(Match.class))).thenReturn(match);

        Match result = matchService.addMatch(match);

        assertNotNull(result);
        assertEquals(homeTeam, result.getHomeTeam());
        assertEquals(awayTeam, result.getAwayTeam());
        verify(matchRepository, times(1)).save(match);
    }

    @Test
    public void testAddMatchMissingHomeTeam() {
        Match match = new Match();
        Team awayTeam = new Team();
        awayTeam.setId(2L);
        match.setAwayTeam(awayTeam);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> matchService.addMatch(match));
        assertEquals("Home team must be provided.", exception.getMessage());
    }

    @Test
    public void testAddMatchMissingAwayTeam() {
        Match match = new Match();
        Team homeTeam = new Team();
        homeTeam.setId(1L);
        match.setHomeTeam(homeTeam);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> matchService.addMatch(match));
        assertEquals("Away team must be provided.", exception.getMessage());
    }

    @Test
    public void testGetAllMatches() {
        Match match1 = new Match();
        Match match2 = new Match();

        when(matchRepository.findAll()).thenReturn(Arrays.asList(match1, match2));

        List<Match> matches = matchService.getAllMatches();

        assertEquals(2, matches.size());
        verify(matchRepository, times(1)).findAll();
    }

    @Test
    public void testDeleteMatch() {
        when(matchRepository.existsById(1L)).thenReturn(true);

        matchService.deleteMatch(1L);

        verify(matchRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testDeleteMatchNotFound() {
        when(matchRepository.existsById(1L)).thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> matchService.deleteMatch(1L));
        assertEquals("Match not found with ID: 1", exception.getMessage());
    }

    @Test
    public void testGetMatchById() {
        Match match = new Match();
        match.setId(1L);

        when(matchRepository.findById(1L)).thenReturn(Optional.of(match));

        Optional<Match> result = matchService.getMatchById(1L);

        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getId());
    }

    @Test
    public void testSaveMatch() {
        Match match = new Match();

        matchService.saveMatch(match);

        verify(matchRepository, times(1)).save(match);
    }

    @Test
    public void testUpdateScoresAndScorers() {
        ScoringRequest scoringRequest = new ScoringRequest();
        scoringRequest.setMatchId(1L);
        scoringRequest.setHomeScore(3);
        scoringRequest.setAwayScore(2);

        // Initialise les listes de buteurs
        scoringRequest.setHomeScorers(new ArrayList<>());
        scoringRequest.setAwayScorers(new ArrayList<>());

        Match match = new Match();
        match.setId(1L);
        match.setHomeTeam(new Team());
        match.setAwayTeam(new Team());

        when(matchRepository.findById(1L)).thenReturn(Optional.of(match));

        matchService.updateScoresAndScorers(scoringRequest);

        verify(matchRepository, times(1)).save(match);
    }
    @Test
    public void testUpdateTeamStatsHomeWin() {
        Match match = new Match();
        Team homeTeam = new Team();
        Team awayTeam = new Team();
        homeTeam.setWins(0);
        awayTeam.setLosses(0);

        match.setHomeTeam(homeTeam);
        match.setAwayTeam(awayTeam);
        match.setHomeScore(3);
        match.setAwayScore(2);

        matchService.updateTeamStats(match);

        assertEquals(1, homeTeam.getWins());
        assertEquals(1, awayTeam.getLosses());
        verify(teamRepository, times(1)).save(homeTeam);
        verify(teamRepository, times(1)).save(awayTeam);
    }

    @Test
    public void testUpdateTeamStatsAwayWin() {
        Match match = new Match();
        Team homeTeam = new Team();
        Team awayTeam = new Team();
        awayTeam.setWins(0);
        homeTeam.setLosses(0);

        match.setHomeTeam(homeTeam);
        match.setAwayTeam(awayTeam);
        match.setHomeScore(1);
        match.setAwayScore(2);

        matchService.updateTeamStats(match);

        assertEquals(1, awayTeam.getWins());
        assertEquals(1, homeTeam.getLosses());
        verify(teamRepository, times(1)).save(homeTeam);
        verify(teamRepository, times(1)).save(awayTeam);
    }
}
