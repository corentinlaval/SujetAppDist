import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-team-recap',
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './team-recap.component.html',
  styleUrl: './team-recap.component.css'
})
export class TeamRecapComponent {
  topTeams = [
    { name: 'Team Alpha', city: 'Paris', logo: 'https://via.placeholder.com/50' },
    { name: 'Team Beta', city: 'Lyon', logo: 'https://via.placeholder.com/50' },
    { name: 'Team Gamma', city: 'Marseille', logo: 'https://via.placeholder.com/50' },
  ];

  topPlayers = [
    { name: 'John Doe', position: 'Forward', photo: 'https://via.placeholder.com/50' },
    { name: 'Jane Smith', position: 'Goalkeeper', photo: 'https://via.placeholder.com/50' },
    { name: 'Jack Black', position: 'Defender', photo: 'https://via.placeholder.com/50' },
  ];

  upcomingMatches = [
    { team1: 'Team Alpha', team2: 'Team Beta', date: '2024-12-20' },
    { team1: 'Team Gamma', team2: 'Team Delta', date: '2024-12-21' },
    { team1: 'Team Epsilon', team2: 'Team Zeta', date: '2024-12-22' },
  ];

}
