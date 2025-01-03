import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addteam',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './addteam.component.html',
  styleUrls: ['./addteam.component.css']
})
export class AddteamComponent {
  team = {
    name: '',
    city: '',
    stadium: '',
    logo: '', // URL du logo
    logoFile: null as File | null
  };

  constructor(private http: HttpClient) {}

  onLogoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.team.logoFile = file;

      // Générer une prévisualisation
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.team.logo = e.target.result; // Base64 pour la prévisualisation
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const teamData = {
      name: this.team.name,
      city: this.team.city,
      stadium: this.team.stadium,
      logoPath: this.team.logo // Assurez-vous que ce champ est attendu en backend
    };

    this.http.post('http://localhost:8080/api/teams', teamData, {
      headers: { 'Content-Type': 'application/json' } // Assurez l'en-tête JSON
    }).subscribe(
      (response) => {
        console.log('Team added successfully:', response);
        alert(`Team ${this.team.name} added successfully!`);
        this.resetForm();
      },
      (error) => {
        console.error('Error adding team:', error);
      }
    );
  }

  private resetForm(): void {
    this.team = {
      name: '',
      city: '',
      stadium: '',
      logo: '',
      logoFile: null
    };
  }
}
