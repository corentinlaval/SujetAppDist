import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddplayerService {
  private apiUrl = 'http://localhost:8080/api/players'; // Remplacez par votre URL d'API.

  constructor(private http: HttpClient) {}

  addPlayer(player: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, player);
  }
}
