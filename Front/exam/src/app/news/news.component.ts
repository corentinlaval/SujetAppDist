import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news: any[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getFootballNews().subscribe(
      (data: any) => {
        this.news = data.articles; // Les articles de l'API
      },
      (error: any) => {
        console.error('Error fetching news:', error);
      }
    );
  }
}
