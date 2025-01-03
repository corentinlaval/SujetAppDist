import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../players.service';
import { NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-player',
  templateUrl: './updateplayer.component.html',
  styleUrls: ['./updateplayer.component.css'],
  imports: [
    NgIf,
    FormsModule,
    NgForOf
  ]
})
export class UpdatePlayerComponent implements OnInit {
  players: any[] = [];
  filteredPlayers: any[] = [];
  selectedPlayer: any = null;
  searchQuery: string = '';

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
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

  onSearch(): void {
    this.filteredPlayers = this.players.filter((player) =>
      player.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectPlayer(player: any): void {
    this.selectedPlayer = { ...player };
  }

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

  onUpdatePlayer(): void {
    if (!this.selectedPlayer || !this.selectedPlayer.id) {
      alert('Please select a player to update.');
      return;
    }

    this.playerService.updatePlayer(this.selectedPlayer).subscribe(
      (response) => {
        alert('Player updated successfully!');
        this.selectedPlayer = null;
        this.ngOnInit(); // Recharge la liste après la mise à jour
      },
      (error) => {
        console.error('Error updating player:', error);
        alert('Failed to update player.');
      }
    );
  }
}
