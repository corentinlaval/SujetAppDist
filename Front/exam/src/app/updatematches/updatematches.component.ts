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
    if (this.selectedMatch) {
      this.matchesService.updateMatch(this.selectedMatch).subscribe(
        () => {
          alert('Match updated successfully!');
          this.loadMatches();
          this.selectedMatch = null;
        },
        (error) => {
          alert('Failed to update match. Please try again.');
          console.error('Error:', error);
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
