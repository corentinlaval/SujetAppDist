package com.poc.exam.service;

import com.poc.exam.model.Player;
import com.poc.exam.model.Team;
import com.poc.exam.repository.PlayerRepository;
import com.poc.exam.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private PlayerRepository playerRepository;

    // Récupérer toutes les équipes
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    // Ajouter une nouvelle équipe
    public Team addTeam(Team team) {
        return teamRepository.save(team);
    }

    // Supprimer une équipe par ID
    public boolean deleteTeam(Long id) {
        if (teamRepository.existsById(id)) {
            teamRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Mettre à jour une équipe
    public Team updateTeam(Long id, Team updatedTeam) {
        return teamRepository.findById(id)
                .map(existingTeam -> {
                    existingTeam.setName(updatedTeam.getName());
                    existingTeam.setCity(updatedTeam.getCity());
                    existingTeam.setStadium(updatedTeam.getStadium());
                    existingTeam.setLogoPath(updatedTeam.getLogoPath());
                    return teamRepository.save(existingTeam);
                })
                .orElseThrow(() -> new RuntimeException("Team not found"));
    }

    // Récupérer une équipe par son ID
    public Team getTeamById(Long id) {
        Optional<Team> team = teamRepository.findById(id);
        return team.orElseThrow(() -> new RuntimeException("Team not found with ID: " + id));
    }

    public List<Player> getPlayersByTeamId(Long teamId) {
        return playerRepository.findByTeamId(teamId);
    }

    public List<Team> getTopTeams() {
        return teamRepository.findTopTeams();
    }
}
