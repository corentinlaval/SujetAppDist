import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  imports: [
    NgForOf
  ]
})
export class CarouselComponent implements OnInit {
  news: any[] = []; // Liste des actualités
  currentSlide = 0; // Index du slide actif

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getFootballNews().subscribe((response: any) => {
      console.log('Articles reçus :', response.articles); // Vérifier les données reçues
      this.news = response.articles
        .filter((article: any) => article.urlToImage && article.title)
        .slice(0, 4); // Filtrer et limiter à 4 articles
    });

    // Démarrer l'autoplay
    this.startAutoplay();
  }

  // Changer de slide via les boutons ou les dots
  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  // Avancer automatiquement au slide suivant
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.news.length;
  }

  // Lancer l'autoplay avec un intervalle
  startAutoplay(): void {
    setInterval(() => {
      this.nextSlide();
    }, 3000); // Changement toutes les 3 secondes
  }
}
