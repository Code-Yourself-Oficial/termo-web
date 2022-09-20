import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match, MoveResult } from '../models/Match';
import { Scoreboard } from '../models/Scoreboard';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private apiUrl = 'https://localhost:7077/api/matches'

  constructor(private http: HttpClient) { }

  createMatch(match: Match): Observable<Match> {
    return this.http.post<Match>(this.apiUrl, match);
  }

  addMove(matchId: string, word: string): Observable<MoveResult> {
    return this.http.post<MoveResult>(`${this.apiUrl}/${matchId}/moves?word=${word}`, null);
  }

  getMatch(userId: string): Observable<Match> {
    return this.http.get<Match>(`${this.apiUrl}?userId=${userId}`);
  }

  getScoreboard(isDaily: boolean): Observable<Scoreboard> {
    return this.http.get<Scoreboard>(`${this.apiUrl}/scoreboard?isDaily=${isDaily}`);
  }
}
