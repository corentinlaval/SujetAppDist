import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../players.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players: any[] = [];

  constructor(private playerService: PlayerService) {
    console.log('PlayersComponent constructor called');
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.playerService.getPlayers().subscribe(
      (data) => {
        console.log('API Response:', data); // Affichez les données dans la console
        this.players = data;
      },
      (error) => {
        console.error('Error fetching players:', error);
      }
    );
  }
}
