import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private baseUrl = 'http://localhost:8080/api/teams'; // URL de l'API

  constructor(private http: HttpClient) {}

  getTeams(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  getAllTeams(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  deleteTeam(teamId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${teamId}`);
  }
}
