package com.poc.exam.controller;

import com.poc.exam.model.Match;
import com.poc.exam.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchController {
    @Autowired
    private MatchService matchService;

    @GetMapping("/upcoming")
    public List<Match> getUpcomingMatches() {
        return matchService.getUpcomingMatches();
    }

    @PostMapping
    public Match addMatch(@RequestBody Match match) {
        return matchService.addMatch(match);
    }
}
