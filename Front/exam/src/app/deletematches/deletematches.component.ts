import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches.service';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-delete-match',
  templateUrl: './deletematches.component.html',
  styleUrls: ['./deletematches.component.css'],
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    UpperCasePipe,
    DatePipe
  ]
})
export class DeletematchesComponent implements OnInit {
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
      `${match.team1Name} vs ${match.team2Name}`
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase())
    );
  }

  selectMatch(match: any): void {
    this.selectedMatch = match;
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

  onDeleteMatch(): void {
    if (this.selectedMatch) {
      this.matchesService.deleteMatch(this.selectedMatch.id).subscribe(
        () => {
          alert('Match deleted successfully!');
          this.selectedMatch = null;
          this.loadMatches(); // Recharger les matchs après suppression
        },
        () => {
          alert('Failed to delete match.');
        }
      );
    }
  }
}
