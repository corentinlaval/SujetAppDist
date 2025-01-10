import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://newsapi.org/v2/everything';
  private apiKey = 'eba3cc682786436e84d6066fe220a9c4';

  constructor(private http: HttpClient) {}

  getFootballNews(): Observable<any> {
    const params = {
      q: 'football',
      language: 'en',
      apiKey: this.apiKey
    };
    return this.http.get(this.apiUrl, { params });
  }
}
