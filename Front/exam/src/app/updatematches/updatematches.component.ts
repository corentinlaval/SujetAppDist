import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches.service';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-update-match',
  templateUrl: './updatematches.component.html',
  styleUrls: ['./updatematches.component.css'],
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    UpperCasePipe,
    DatePipe
  ]
})
export class UpdatematchesComponent implements OnInit {
  matches: any[] = [];
  filteredMatches: any[] = [];
  selectedMatch: any;
  searchQuery: string = '';

  constructor(private matchesService: MatchesService) {}

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches(): void {
    this.matchesService.getMatches().subscribe((data) => {
      this.matches = data;
      this.filteredMatches = data;
    });
  }

  onSearch(): void {
    this.filteredMatches = this.matches.filter((match) =>
      `${match.homeTeam?.name} vs ${match.awayTeam?.name}`
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase())
    );
  }

  selectMatch(match: any): void {
    this.selectedMatch = { ...match };
  }

  onUpdateMatch(): void {
    if (!this.selectedMatch || !this.selectedMatch.id) {
      alert('Please select a match to update.');
      return;
    }

    this.matchesService.updateMatch(this.selectedMatch).subscribe({
      next: (response) => {
        console.log('Response:', response);
        alert('Match updated successfully!');
        this.selectedMatch = null;
        this.loadMatches(); // Recharge la liste des matchs
      },
      error: (error) => {
        if (error.status && error.status !== 200) {
          console.error('Error updating match:', error);
          alert('Failed to update match. Please try again.');
        } else {
          alert('Match updated successfully!');
          this.selectedMatch = null;
          this.loadMatches(); // Recharge la liste des matchs
        }
      },
    });
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

  formatTimeForInput(matchTime: string | null): string | null {
    if (!matchTime) return null;

    const [timePart, modifier] = matchTime.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  formatDateForInput(matchDate: string | Date | null): string | null {
    if (!matchDate) return null;

    const date = new Date(matchDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ajoute un zéro devant les mois < 10
    const day = date.getDate().toString().padStart(2, '0'); // Ajoute un zéro devant les jours < 10

    return `${year}-${month}-${day}`;
  }
}
