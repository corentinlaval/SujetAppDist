import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgForOf, NgIf, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-fill-points',
  templateUrl: './fillpoints.component.html',
  styleUrls: ['./fillpoints.component.css'],
  imports: [
    FormsModule,
    UpperCasePipe,
    NgIf,
    NgForOf,
    DatePipe
  ]
})
export class FillpointsComponent implements OnInit {
  matches: any[] = [];
  filteredMatches: any[] = [];
  selectedMatch: any = null;
  searchQuery: string = '';

  constructor(
    private matchesService: MatchesService,
    private http: HttpClient // Inject the HttpClient
  ) {}

  ngOnInit(): void {
    this.loadMatches();
  }

  // Load all matches from the server
  loadMatches(): void {
    this.matchesService.getMatches().subscribe((data) => {
      this.matches = data;
      this.filteredMatches = data;
    });
  }

  // Filter matches based on the search query
  onSearch(): void {
    this.filteredMatches = this.matches.filter((match) =>
      `${match.homeTeam?.name} vs ${match.awayTeam?.name}`
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase())
    );
  }

  // Select a match to update
  selectMatch(match: any): void {
    this.selectedMatch = { ...match };
  }

  // Update the match points
  onFillPoints(): void {
    if (this.selectedMatch) {
      // Préparer l'objet de match mis à jour
      const updatedMatch = {
        id: this.selectedMatch.id,
        homeTeam: this.selectedMatch.homeTeam,
        awayTeam: this.selectedMatch.awayTeam,
        location: this.selectedMatch.location,
        matchDate: this.selectedMatch.matchDate,
        matchTime: this.selectedMatch.matchTime,
        homeScore: this.selectedMatch.homeScore,
        awayScore: this.selectedMatch.awayScore,
      };

      // Envoyer la requête PUT avec l'objet complet du match
      this.http
          .put(`http://localhost:8080/api/matches/${this.selectedMatch.id}`, updatedMatch)
          .subscribe(
              () => {
                alert('Points updated successfully!');
                this.loadMatches(); // Recharger les matchs après la mise à jour
                this.selectedMatch = null; // Désélectionner le match après la mise à jour
              },
              (error) => {
                console.error('Error updating points:', error);
                alert('Failed to update points. Please try again.');
              }
          );
    }
  }

  // Convert AM/PM time to 24-hour format
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
