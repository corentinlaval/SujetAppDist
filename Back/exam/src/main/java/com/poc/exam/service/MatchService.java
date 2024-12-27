package com.poc.exam.service;

import com.poc.exam.model.Match;
import com.poc.exam.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MatchService {
    @Autowired
    private MatchRepository matchRepository;

    public List<Match> getUpcomingMatches() {
        return matchRepository.findByMatchDateAfter(LocalDate.now());
    }

    public Match addMatch(Match match) {
        return matchRepository.save(match);
    }
}
