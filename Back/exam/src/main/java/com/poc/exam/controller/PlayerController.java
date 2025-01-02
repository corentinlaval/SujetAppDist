package com.poc.exam.controller;

import com.poc.exam.DTO.PlayerRequest;
import com.poc.exam.model.Player;
import com.poc.exam.model.Team;
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

    @GetMapping
    public List<Player> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @PostMapping
    public Player addPlayer(@RequestBody PlayerRequest playerRequest) {
        Player player = new Player();
        player.setName(playerRequest.getName());
        player.setPosition(playerRequest.getPosition());

        // Décoder l'image encodée en base64 si elle est présente
        if (playerRequest.getProfilePictureBase64() != null) {
            String filePath = saveImage(playerRequest.getProfilePictureBase64());
            player.setProfilePicturePath(filePath);
        }

        // Associer une équipe si nécessaire
        if (playerRequest.getTeamId() != 0) {
            Team team = new Team();
            team.setId(playerRequest.getTeamId());
            player.setTeam(team);
        }

        return playerService.addPlayer(player);
    }

    // Méthode utilitaire pour sauvegarder l'image sur le disque
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

    @DeleteMapping("/{id}")
    public void deletePlayer(@PathVariable Long id) {
        playerService.deletePlayer(id);
    }
}
