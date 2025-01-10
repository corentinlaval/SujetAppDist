import { Component } from '@angular/core';
import { TeamsService } from '../teams.service';
import {FormsModule} from '@angular/forms';
import {NgIf, NgForOf} from '@angular/common';

@Component({
  selector: 'app-deleteteam',
  templateUrl: './deleteteam.component.html',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./deleteteam.component.css']
})
export class DeleteteamComponent {
  teams: any[] = []; // Liste des équipes
  searchQuery: string = ''; // Terme de recherche
  filteredTeams: any[] = []; // Résultats filtrés
  selectedTeam: any | null = null; // Équipe sélectionnée

  constructor(private teamService: TeamsService) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((teams) => {
      this.teams = teams;
      this.filteredTeams = teams;
    });
  }

  onSearch(): void {
    this.filteredTeams = this.teams.filter((team) =>
      team.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectTeam(team: any): void {
    this.selectedTeam = team;
  }

  onDeleteTeam(): void {
    const confirmation = window.confirm(
      `Are you sure you want to delete the team "${this.selectedTeam.name}"?`
    );

    if (confirmation) {
      this.teamService.deleteTeam(this.selectedTeam.id).subscribe({
        next: () => {
          alert('Team successfully deleted.');
          this.selectedTeam = null;
          this.searchQuery = '';
          this.onSearch();
        },
        error: (err) => {
          console.error('Error deleting team:', err);
          alert('Failed to delete the team. Please try again.');
        }
      });
    }
  }
}
