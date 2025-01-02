import { Component, OnInit } from '@angular/core';
import {CarouselComponent} from '../carousel/carousel.component';

@Component({
  selector: 'app-welcome', // Correspond au fichier et au sélecteur
  templateUrl: './home.component.html',
  imports: [
    CarouselComponent
  ],
  styleUrls: ['./home.component.css']
})
export class WelcomeComponent implements OnInit {
  currentDate: string = '';
  currentTime: string = '';

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => {
      this.updateDateTime();
    }, 1000); // Met à jour chaque seconde
  }

  private updateDateTime(): void {
    const now = new Date();
    this.currentDate = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.currentTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
}
