import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches.service';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-team-recap',
  templateUrl: './team-recap.component.html',
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    RouterLinkActive
  ],
  styleUrls: ['./team-recap.component.css']
})
export class TeamRecapComponent implements OnInit {
  topTeams: any[] = [];
  topPlayers: any[] = [];
  upcomingMatches: any[] = [];

  constructor(private matchesService: MatchesService) {}

  ngOnInit(): void {
    this.loadTopTeams();
    this.loadTopPlayers();
    this.loadUpcomingMatches();
  }

  // Charger le classement des meilleures équipes
  loadTopTeams(): void {
    this.matchesService.getTopTeams().subscribe((data) => {
      this.topTeams = data;
    });
  }

  // Charger les meilleurs joueurs
  loadTopPlayers(): void {
    this.matchesService.getTopPlayers().subscribe((data) => {
      this.topPlayers = data;
    });
  }

  // Charger les prochains matchs
  loadUpcomingMatches(): void {
    this.matchesService.getUpcomingMatches().subscribe((data) => {
      this.upcomingMatches = data;
    });
  }
}
