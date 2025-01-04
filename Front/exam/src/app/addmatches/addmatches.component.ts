import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches.service';
import { TeamsService } from '../teams.service';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
    this.teamsService.getTeams().subscribe((data) => {
      this.teams = data;
      this.filteredTeamsForTeam2 = data;
    });
  }

  onTeamSelect(teamId: string, team: 'team1' | 'team2'): void {
    if (team === 'team1') {
      this.match.team1 = teamId;
      this.filteredTeamsForTeam2 = this.teams.filter((t) => t.id != teamId);
    } else if (team === 'team2') {
      this.match.team2 = teamId;
    }
  }

  private getTeamNameById(teamId: string | number): string {
    const team = this.teams.find((t) => t.id == teamId); // Utilisation de "==" pour éviter les problèmes de type
    return team ? team.name : 'Unknown Team';
  }

  isFormValid(): boolean {
    return (
      !!this.match.team1 &&
      !!this.match.team2 &&
      this.match.team1 !== this.match.team2 &&
      !!this.match.location &&
      !!this.match.date &&
      !!this.match.time
    );
  }

  onAddMatch(): void {
    if (this.isFormValid()) {
      const matchToSave = {
        team1Id: this.match.team1,
        team2Id: this.match.team2,
        team1Logo: this.match.team1Logo,
        team2Logo: this.match.team2Logo,
        location: this.match.location,
        matchDate: this.match.date,
        matchTime: this.match.time,
      };

      const team1Name = this.getTeamNameById(this.match.team1);
      const team2Name = this.getTeamNameById(this.match.team2);

      if (team1Name !== 'Unknown Team' && team2Name !== 'Unknown Team') {
        this.http.post('http://localhost:8080/api/matches', matchToSave).subscribe(
          (response) => {
            alert(`Match between ${team1Name} and ${team2Name} added successfully!`);
            this.resetForm();
          },
          (error) => {
            console.error('Error adding match:', error);
            this.feedbackMessage = 'Error adding match. Please try again.';
          }
        );
      } else {
        alert('Failed to identify teams. Please try again.');
      }
    }
  }

  private resetForm(): void {
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
