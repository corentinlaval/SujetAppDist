package com.poc.exam.controller;

import com.poc.exam.DTO.PlayerRequest;
import com.poc.exam.model.Player;
import com.poc.exam.model.Team;
import com.poc.exam.repository.TeamRepository;
import com.poc.exam.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private TeamRepository teamRepository;

    @GetMapping
    public List<Player> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @PostMapping
    public Player addPlayer(@RequestBody PlayerRequest playerRequest) {
        Player player = new Player();
        player.setName(playerRequest.getName());
        player.setPosition(playerRequest.getPosition());

        if (playerRequest.getProfilePictureBase64() != null) {
            String filePath = saveImage(playerRequest.getProfilePictureBase64());
            player.setProfilePicturePath(filePath);
        }

        if (playerRequest.getTeamId() != null) {
            Team team = teamRepository.findById(playerRequest.getTeamId())
                    .orElseThrow(() -> new RuntimeException("Team not found"));
            player.setTeam(team);
        }

        return playerService.addPlayer(player);
    }

    @PutMapping("/{id}")
    public Player updatePlayer(@PathVariable Long id, @RequestBody PlayerRequest playerRequest) {
        Player existingPlayer = playerService.getPlayerById(id)
                .orElseThrow(() -> new RuntimeException("Player not found"));

        existingPlayer.setName(playerRequest.getName());
        existingPlayer.setPosition(playerRequest.getPosition());

        if (playerRequest.getProfilePictureBase64() != null) {
            String filePath = saveImage(playerRequest.getProfilePictureBase64());
            existingPlayer.setProfilePicturePath(filePath);
        }

        if (playerRequest.getTeamId() != null) {
            Team team = teamRepository.findById(playerRequest.getTeamId())
                    .orElseThrow(() -> new RuntimeException("Team not found"));
            existingPlayer.setTeam(team);
        }

        return playerService.updatePlayer(existingPlayer);
    }

    @DeleteMapping("/{id}")
    public void deletePlayer(@PathVariable Long id) {
        playerService.deletePlayer(id);
    }

    private String saveImage(String base64Image) {
        try {
            byte[] decodedBytes = java.util.Base64.getDecoder().decode(base64Image);
            String filePath = "images/" + System.currentTimeMillis() + ".png";
            java.nio.file.Path path = java.nio.file.Paths.get(filePath);
            java.nio.file.Files.createDirectories(path.getParent());
            java.nio.file.Files.write(path, decodedBytes);
            return filePath;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image", e);
        }
    }

    @GetMapping("/top")
    public List<Player> getTopPlayers() {
        return playerService.getTopPlayers();
    }
}
