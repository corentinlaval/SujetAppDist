package com.poc.exam.controller;

import com.poc.exam.model.Team;
import com.poc.exam.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    @PostMapping
    public Team addTeam(@RequestBody Team team) {
        return teamService.addTeam(team);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long id) {
        boolean isDeleted = teamService.deleteTeam(id);

        if (isDeleted) {
            return ResponseEntity.noContent().build(); // Retourne un 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // Retourne un 404 Not Found si l'équipe n'existe pas
        }
    }
}
