import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../teams.service';
import { NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-team',
  templateUrl: './updateteam.component.html',
  styleUrls: ['./updateteam.component.css'],
  imports: [NgIf, FormsModule, NgForOf],
})
export class UpdateteamComponent implements OnInit {
  teams: any[] = [];
  filteredTeams: any[] = [];
  selectedTeam: any;
  searchQuery: string = '';

  constructor(private teamService: TeamsService) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((data) => {
      this.teams = data;
      this.filteredTeams = data;
    });
  }

  onSearch(): void {
    this.filteredTeams = this.teams.filter((team) =>
      team.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectTeam(team: any): void {
    this.selectedTeam = { ...team };
  }

  onLogoChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedTeam.logo = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onUpdateTeam(): void {
    this.teamService.updateTeam(this.selectedTeam.id, this.selectedTeam).subscribe(
      (response) => {
        alert('Team updated successfully!');
        this.selectedTeam = null;
      },
      (error) => {
        alert('Failed to update team.');
      }
    );
  }
}
