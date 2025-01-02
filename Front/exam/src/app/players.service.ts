import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:8080/api/players';

  constructor(private http: HttpClient) {
    console.log('ServicePlayers constructor called');
  }

  getPlayers(): Observable<any[]> {
    console.log('getPlayers called');
    return this.http.get<any[]>(this.apiUrl);
  }

  addPlayer(player: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, player);
  }

  addPlayerWithPhoto(playerData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, playerData); // Envoi des données au backend
  }

  // Supprimer un joueur par ID
  deletePlayer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
