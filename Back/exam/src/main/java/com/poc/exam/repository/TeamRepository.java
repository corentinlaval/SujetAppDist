package com.poc.exam.repository;

import com.poc.exam.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findAll();

    Team save(Team team);

    @Query("SELECT t FROM Team t ORDER BY t.wins DESC")
    List<Team> findTopTeams();
}
