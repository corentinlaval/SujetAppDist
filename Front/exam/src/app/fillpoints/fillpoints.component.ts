import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgForOf, NgIf, UpperCasePipe } from '@angular/common';
import {Observable} from "rxjs";

@Component({
  selector: 'app-fill-points',
  templateUrl: './fillpoints.component.html',
  styleUrls: ['./fillpoints.component.css'],
  imports: [FormsModule, UpperCasePipe, NgIf, NgForOf, DatePipe],
})
export class FillpointsComponent implements OnInit {
  matches: any[] = [];
  filteredMatches: any[] = [];
  selectedMatch: any = null;
  searchQuery: string = '';
  homeScorers: { playerId: number | null; goals: number }[] = [];
  awayScorers: { playerId: number | null; goals: number }[] = [];

  constructor(private matchesService: MatchesService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMatches();
  }

  // Charge les matchs depuis le serveur
  loadMatches(): void {
    this.matchesService.getMatches().subscribe((data) => {
      this.matches = data;
      this.filteredMatches = data;
    });
  }

  // Recherche de matchs
  onSearch(): void {
    this.filteredMatches = this.matches.filter((match) =>
        `${match.homeTeam?.name} vs ${match.awayTeam?.name}`
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
    );
  }

  // Sélectionner un match à remplir
  selectMatch(match: any): void {
    this.selectedMatch = { ...match };

    // Charger les joueurs de l'équipe à domicile
    this.loadPlayers(this.selectedMatch.homeTeam.id).subscribe((players) => {
      this.selectedMatch.homeTeam.players = players;
    });

    // Charger les joueurs de l'équipe à l'extérieur
    this.loadPlayers(this.selectedMatch.awayTeam.id).subscribe((players) => {
      this.selectedMatch.awayTeam.players = players;
    });

    // Initialisation des buteurs avec un tableau vide
    this.homeScorers = [];
    this.awayScorers = [];
  }

  // Ajouter un point et sélectionner un buteur
  onScoreChange(team: 'home' | 'away'): void {
    if (team === 'home') {
      this.homeScorers = Array.from({ length: this.selectedMatch.homeScore }, () => ({
        playerId: null,
        goals: 1,
      }));
    } else if (team === 'away') {
      this.awayScorers = Array.from({ length: this.selectedMatch.awayScore }, () => ({
        playerId: null,
        goals: 1,
      }));
    }
  }

  // Soumettre les points à une nouvelle API
  onFillPoints(): void {
    if (this.selectedMatch) {
      const scoringData = {
        matchId: this.selectedMatch.id,
        homeScore: this.selectedMatch.homeScore,
        awayScore: this.selectedMatch.awayScore,
        homeScorers: this.homeScorers,
        awayScorers: this.awayScorers,
      };

      this.http.post('http://localhost:8080/api/matches/update-scores', scoringData).subscribe(
          () => {
            alert('Points updated successfully!');
            this.loadMatches();
            this.selectedMatch = null;
          },
          (error) => {
            console.error('Error updating points and scorers:', error);
            alert('Failed to update points and scorers. Please try again.');
          }
      );
    }
  }

  loadPlayers(teamId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/teams/${teamId}/players`);
  }

  onAddPoint(playerId: number, team: 'home' | 'away'): void {
    if (this.selectedMatch) {
      this.matchesService.addPoint(this.selectedMatch.id, playerId).subscribe(
          () => {
            alert('Point added successfully!');
            this.loadMatches();
          },
          (error) => {
            console.error('Error adding point:', error);
            alert('Failed to add point.');
          }
      );
    }
  }

  onRemovePoint(playerId: number, team: 'home' | 'away'): void {
    if (this.selectedMatch) {
      this.matchesService.removePoint(this.selectedMatch.id, playerId).subscribe(
          () => {
            alert('Point removed successfully!');
            this.loadMatches();
          },
          (error) => {
            console.error('Error removing point:', error);
            alert('Failed to remove point.');
          }
      );
    }
  }
  formatTimeTo24Hour(time: string | null): Date | null {
    if (!time) return null; // Vérifie si time est null ou undefined

    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return new Date(1970, 0, 1, hours, minutes);
  }
}
