import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css'],
  imports: [
    NgForOf,
    DatePipe,
    NgIf
  ]
})
export class RankingsComponent implements OnInit {
  topPlayers: any[] = [];
  topTeams: any[] = [];
  upcomingMatches: any[] = [];

  constructor(private matchesService: MatchesService) {}

  ngOnInit(): void {
    this.loadTopPlayers();
    this.loadTopTeams();
    this.loadUpcomingMatches();
  }

  loadTopPlayers(): void {
    this.matchesService.getTopPlayers().subscribe((data) => {
      this.topPlayers = data;
    });
  }

  loadTopTeams(): void {
    this.matchesService.getTopTeams().subscribe((data) => {
      this.topTeams = data;
    });
  }

  loadUpcomingMatches(): void {
    this.matchesService.getUpcomingMatches().subscribe((data) => {
      this.upcomingMatches = data;
    });
  }
}
