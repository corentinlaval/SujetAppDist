package com.poc.exam.repository;

import com.poc.exam.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByTeamId(Long teamId);

    @Query("SELECT p FROM Player p ORDER BY p.points DESC")
    List<Player> findTopPlayers();
}
