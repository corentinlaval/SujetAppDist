import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  private apiUrl = 'http://localhost:8080/api/matches';

  constructor(private http: HttpClient) {}

  getMatches(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addMatch(match: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, match);
  }

  updateMatch(match: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${match.id}`, match);
  }

  deleteMatch(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un point
  addPoint(matchId: number, playerId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${matchId}/add-point`, { playerId });
  }

// Enlever un point
  removePoint(matchId: number, playerId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${matchId}/remove-point`, { playerId });
  }

  updateScoresAndScorers(scoringData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/matches/update-scores-and-scorers', scoringData);
  }

  // Récupérer les meilleures équipes
  getTopTeams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/teams/top`);
  }

  // Récupérer les meilleurs joueurs
  getTopPlayers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/players/top`);
  }

  // Récupérer les prochains matchs
  getUpcomingMatches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/upcoming`);
  }

}
