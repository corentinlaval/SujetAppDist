import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches.service';
import {DatePipe, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-match-list',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  imports: [
    NgForOf,
    DatePipe,
    FormsModule
  ]
})
export class MatchesComponent implements OnInit {
  matches: any[] = [];
  sortedMatches: any[] = [];
  sortOption: string = 'date';

  constructor(private matchesService: MatchesService) {}

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches(): void {
    this.matchesService.getMatches().subscribe((data) => {
      this.matches = data;
      this.sortMatches();
    });
  }

  onSortChange(): void {
    this.sortMatches();
  }

  sortMatches(): void {
    if (this.sortOption === 'date') {
      this.sortedMatches = this.matches.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (this.sortOption === 'team') {
      this.sortedMatches = this.matches.sort((a, b) =>
        a.team1Name.localeCompare(b.team1Name)
      );
    }
  }
}
