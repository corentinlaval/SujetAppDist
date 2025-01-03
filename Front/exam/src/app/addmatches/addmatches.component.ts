import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches.service';
import { TeamsService } from '../teams.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-add-match',
  templateUrl: './addmatches.component.html',
  styleUrls: ['./addmatches.component.css'],
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ]
})
export class AddmatchesComponent implements OnInit {
  match = {
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

  constructor(
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
      this.filteredTeamsForTeam2 = this.teams.filter((t) => t.id !== teamId);
    } else if (team === 'team2') {
      this.match.team2 = teamId;
    }
  }

  isFormValid(): boolean {
    return (
      !!this.match.team1 &&
      !!this.match.team2 &&
      Number(this.match.team1) !== Number(this.match.team2) &&
      !!this.match.location &&
      !!this.match.date &&
      !!this.match.time
    );
  }

  onAddMatch(): void {
    if (this.isFormValid()) {
      this.matchesService.addMatch(this.match).subscribe(
        (response) => {
          alert('Match added successfully!');
          this.resetForm();
        },
        (error) => {
          alert('Failed to add match.');
        }
      );
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
