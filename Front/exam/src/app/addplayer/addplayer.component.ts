import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addplayer',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './addplayer.component.html',
  styleUrl: './addplayer.component.css'
})
export class AddplayerComponent {
  player = {
    name: '',
    position: '',
    team: '',
    photo: '', // URL de l'image
  };

  onPhotoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.player.photo = e.target.result; // Stocke l'URL de l'image
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onSubmit(): void {
    console.log('Player added:', this.player);
  }
}
