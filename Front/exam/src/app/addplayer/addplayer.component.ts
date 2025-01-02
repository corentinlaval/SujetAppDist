import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-addplayer',
  templateUrl: './addplayer.component.html',
  styleUrls: ['./addplayer.component.css'],
  imports: [
    FormsModule,
    NgIf
  ]
})
export class AddplayerComponent implements OnInit {
  player = {
    name: '',
    position: '',
    teamId: undefined, // ID de l'équipe sélectionnée
    photo: '', // Base64 pour prévisualisation
    photoFile: null as File | null,
  };

  teams: any[] = []; // Liste des équipes

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTeams(); // Charge les équipes disponibles
  }

  loadTeams(): void {
    this.http.get<any[]>('http://localhost:8080/api/teams').subscribe(
      (data) => {
        this.teams = data;
      },
      (error) => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  onPhotoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.player.photoFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.player.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const playerData: any = {
      name: this.player.name,
      position: this.player.position,
      profilePictureBase64: this.player.photo || null,
    };

    // Inclure teamId uniquement si renseigné
    if (this.player.teamId) {
      playerData.teamId = this.player.teamId;
    }

    this.http.post('http://localhost:8080/api/players', playerData).subscribe(
      (response) => {
        console.log('Player added successfully:', response);
        this.resetForm();
      },
      (error) => {
        console.error('Error adding player:', error);
      }
    );
  }

  private resetForm(): void {
    this.player = {
      name: '',
      position: '',
      teamId: undefined,
      photo: '',
      photoFile: null,
    };
  }
}
