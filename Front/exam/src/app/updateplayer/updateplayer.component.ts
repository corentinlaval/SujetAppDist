import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../players.service';
import { TeamsService } from '../teams.service'; // Service pour les équipes
import { NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-player',
  templateUrl: './updateplayer.component.html',
  styleUrls: ['./updateplayer.component.css'],
  imports: [NgIf, FormsModule, NgForOf],
})
export class UpdatePlayerComponent implements OnInit {
  players: any[] = [];
  filteredPlayers: any[] = [];
  teams: any[] = []; // Liste des équipes disponibles
  selectedPlayer: any = null;
  searchQuery: string = '';

  constructor(
      private playerService: PlayerService,
      private teamService: TeamsService // Service pour récupérer les équipes
  ) {}

  ngOnInit(): void {
    this.loadPlayers();
    this.loadTeams();
  }

  // Charger la liste des joueurs
  loadPlayers(): void {
    this.playerService.getPlayers().subscribe(
        (data) => {
          this.players = data;
          this.filteredPlayers = data;
        },
        (error) => {
          console.error('Error fetching players:', error);
        }
    );
  }

  // Charger la liste des équipes
  loadTeams(): void {
    this.teamService.getTeams().subscribe(
        (data) => {
          this.teams = data;
        },
        (error) => {
          console.error('Error fetching teams:', error);
        }
    );
  }

  // Filtrer les joueurs selon la recherche
  onSearch(): void {
    this.filteredPlayers = this.players.filter((player) =>
        player.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Sélectionner un joueur pour la mise à jour
  selectPlayer(player: any): void {
    this.selectedPlayer = { ...player };
  }

  // Gestion de la photo
  onPhotoChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPlayer.photo = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Mise à jour du joueur
  onUpdatePlayer(): void {
    if (!this.selectedPlayer || !this.selectedPlayer.id) {
      alert('Please select a player to update.');
      return;
    }

    this.playerService.updatePlayer(this.selectedPlayer).subscribe(
        (response) => {
          alert('Player updated successfully!');
          this.selectedPlayer = null;
          this.loadPlayers(); // Recharge la liste après la mise à jour
        },
        (error) => {
          console.error('Error updating player:', error);
          alert('Failed to update player.');
        }
    );
  }
}
