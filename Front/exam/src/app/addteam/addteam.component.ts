import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-addteam',
    imports: [
        FormsModule,
        NgIf
    ],
  templateUrl: './addteam.component.html',
  styleUrl: './addteam.component.css'
})
export class AddteamComponent {
  team = {
    name: '',
    city: '',
    stadium: '',
    logo: '', // URL du logo
  };

  onLogoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.team.logo = e.target.result; // Stocke l'URL du logo
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onSubmit(): void {
    console.log('Team added:', this.team);
  }
}
