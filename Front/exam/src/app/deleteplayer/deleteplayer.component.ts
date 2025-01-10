import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../players.service';
import {NgIf, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-deleteplayer',
  templateUrl: './deleteplayer.component.html',
  imports: [
    NgIf,
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./deleteplayer.component.css']
})
export class DeleteplayerComponent implements OnInit {
  players: any[] = []; // Tous les joueurs
  filteredPlayers: any[] = []; // Joueurs filtrés par recherche
  selectedPlayer: any; // Joueur sélectionné
  searchQuery = ''; // Requête de recherche

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  // Charger tous les joueurs
  loadPlayers(): void {
    this.playerService.getPlayers().subscribe((players: any[]) => {
      this.players = players;
      this.filteredPlayers = players; // Initialement, tous les joueurs sont affichés
    });
  }

  // Recherche des joueurs
  onSearch(): void {
    this.filteredPlayers = this.players.filter((player) =>
      player.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Sélectionner un joueur
  selectPlayer(player: any): void {
    this.selectedPlayer = player;
  }

  // Supprimer un joueur
  onDeletePlayer(): void {
    const confirmation = window.confirm(
      `Are you sure you want to delete the player "${this.selectedPlayer.name}"?`
    );

    if (this.selectedPlayer && this.selectedPlayer.id) {
      this.playerService.deletePlayer(this.selectedPlayer.id).subscribe(() => {
        alert(`Player ${this.selectedPlayer.name} deleted successfully!`);
        this.loadPlayers(); // Recharger la liste des joueurs
        this.selectedPlayer = null; // Réinitialiser la sélection
      });
    }
  }
}
