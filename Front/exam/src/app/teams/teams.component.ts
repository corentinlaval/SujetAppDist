import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: any[] | null = null; // Stocke les données des équipes

  constructor(private teamService: TeamsService) {}

  ngOnInit(): void {
    this.fetchTeams(); // Récupère les équipes au chargement du composant
  }

  fetchTeams(): void {
    this.teamService.getTeams().subscribe(
      (data: any[]) => {
        this.teams = data; // Assigne les données récupérées
      },
      (error: any) => {
        console.error('Error fetching teams:', error); // Gère les erreurs
      }
    );
  }
}
