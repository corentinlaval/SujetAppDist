import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches.service';
import { TeamsService } from '../teams.service';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-add-match',
  templateUrl: './addmatches.component.html',
  styleUrls: ['./addmatches.component.css'],
  imports: [FormsModule, NgIf, NgForOf],
})
export class AddmatchesComponent implements OnInit {
  match: any = {
    team1: '',
    team2: '',
    team1Logo: '',
    team2Logo: '',
    location: '',
    date: '',
    time: '',
  };

  teams: any[] = [];
  filteredTeamsForTeam2: any[] = [];
  feedbackMessage: string = '';

  constructor(
    private http: HttpClient,
    private matchesService: MatchesService,
    private teamsService: TeamsService
  ) {}

  ngOnInit(): void {
    console.log('Fetching teams...');
    this.teamsService.getTeams().subscribe({
      next: (data) => {
        this.teams = data;
        this.filteredTeamsForTeam2 = data;
        console.log('Teams loaded:', this.teams);
      },
      error: (error) => {
        console.error('Error fetching teams:', error);
      },
    });
  }

  onTeamSelect(teamId: string, team: 'team1' | 'team2'): void {
    console.log(`Team selected: ${teamId} for ${team}`);
    if (team === 'team1') {
      this.match.team1 = teamId;
      this.filteredTeamsForTeam2 = this.teams.filter((t) => t.id != teamId);
      console.log('Filtered teams for team2:', this.filteredTeamsForTeam2);
    } else if (team === 'team2') {
      this.match.team2 = teamId;
    }
  }

  private getTeamNameById(teamId: string | number): string {
    const team = this.teams.find((t) => t.id == teamId);
    console.log(`Fetching team name for ID: ${teamId}`, team);
    return team ? team.name : 'Unknown Team';
  }

  isFormValid(): boolean {
    console.log('Validating form...');
    const isValid =
      !!this.match.team1 &&
      !!this.match.team2 &&
      this.match.team1 !== this.match.team2 &&
      !!this.match.location &&
      !!this.match.date &&
      !!this.match.time;
    console.log('Form is valid:', isValid);
    return isValid;
  }

  onAddMatch(): void {
    console.log('Attempting to add match...', this.match);
    if (this.isFormValid()) {
      // Le format correct attendu par le backend
      const matchToSave = {
        homeTeam: { id: this.match.team1 },
        awayTeam: { id: this.match.team2 },
        location: this.match.location,
        matchDate: this.match.date,
        matchTime: this.match.time,
        homeScore: 0,
        awayScore: 0,
      };

      const team1Name = this.getTeamNameById(this.match.team1);
      const team2Name = this.getTeamNameById(this.match.team2);

      console.log('Match to save:', matchToSave);
      if (team1Name && team2Name) {
        this.http.post('http://localhost:8080/api/matches', matchToSave).subscribe({
          next: (response) => {
            console.log('Match added successfully:', response);
            alert(`Match between ${team1Name} and ${team2Name} added successfully!`);
            this.resetForm();
          },
          error: (error) => {
            console.error('Error adding match:', error);
            alert(`Failed to add match. Error: ${error.message}`);
          },
        });
      } else {
        alert('Failed to identify teams. Please try again.');
      }
    } else {
      alert('Please complete all fields before adding the match.');
    }
  }

  private resetForm(): void {
    console.log('Resetting form...');
    this.match = {
      team1: '',
      team2: '',
      team1Logo: '',
      team2Logo: '',
      location: '',
      date: '',
      time: '',
    };
    this.filteredTeamsForTeam2 = this.teams;
  }
}
